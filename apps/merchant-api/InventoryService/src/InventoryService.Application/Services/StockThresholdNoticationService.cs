using System.Text.Json;
using Backend.Domain.Entities.Interfaces;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Intraestructure.Repositories.Interfaces;

namespace InventoryService.Application.Services;

public class StockThresholdNoticationService(IProductRepository productRepository, HttpClient httpClient, HttpStockThresholdService storeThreshold)
{

    public async Task NotifyStockThresholdReached(List<(ProductVariantDto, int)> productVariants)
    {
        var userServiceRoute = Environment.GetEnvironmentVariable("API_GATEWAY_ROUTE");
        Dictionary<Guid, List<OrderItem>> lowStockEmailsByStore = [];


        foreach (var (variant, reduce) in productVariants)
        {
            var product = await productRepository.GetByIdAsync(variant.ProductId);
            if (product == null) continue;
            int threshold = 0;
            if (product.LowStockThreshold == null || product.LowStockThreshold == 0)
            {
                if (product.StoreId != null)
                    threshold = await storeThreshold.GetStockThreshold(product.StoreId.Value);
            }
            else
            {
                threshold = product.LowStockThreshold ?? 0;
            }
            if (variant.StockQuantity < threshold && (variant.StockQuantity + reduce) > threshold)
            {
                var orderItem = new OrderItem
                 (
                     product.Name,
                     variant.StockQuantity,
                    variant.Attributes.Select(attr => $"{attr.Name}: {attr.Value}").ToList()
                 );
                if (product.StoreId == null) continue;

                if (lowStockEmailsByStore.TryGetValue((Guid)product.StoreId, out var lowStockEmails))
                {
                    lowStockEmails.Add(orderItem);
                }
                else
                {
                    lowStockEmailsByStore.Add((Guid)product.StoreId, [orderItem]);
                }
            }
        }


        if (lowStockEmailsByStore.Count > 0)
        {
            var jsonContent = JsonSerializer.Serialize(lowStockEmailsByStore);
            var content = new StringContent(jsonContent, System.Text.Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync($"{userServiceRoute}/users/user/lowStock", content);
            result.EnsureSuccessStatusCode();
        }
    }


}