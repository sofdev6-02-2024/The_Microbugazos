using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using Commons.ResponseHandler.Responses.Concretes;
using PaymentService.Application.Dtos.Orders;
using PaymentService.Application.Dtos.Products;
using PaymentService.Application.Services.Clients;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Repositories.Interfaces;

namespace PaymentService.Application.Services;

public class OrderItemService(
    IResponseHandlingHelper responseHandlingHelper,
    ProductClientService productClientService,
    IRepository<OrderItem> orderItemRepository
    )
{
    public async Task<BaseResponse> CreateOrderItem(CreateOrderItemDto orderItemDto,  Guid orderId)
    {
        var productVariant = await productClientService.GetProductVariantByIdAsync(orderItemDto.ProductVariantId);
        if (productVariant == null)
            return responseHandlingHelper.NotFound<ProductVariantDto>(
                "Product variant with the follow id " + orderItemDto.ProductVariantId + " was not found");
            
        var product = await productClientService.GetProductByIdAsync(productVariant.ProductId);
        if (product == null)
            return responseHandlingHelper.NotFound<ProductDto>(
                "Product with the follow id " + orderItemDto.ProductVariantId + " was not found");

        var orderItem = new OrderItem
        {
            OrderId = orderId,
            ProductVariantId = orderItemDto.ProductVariantId,
            Quantity = orderItemDto.Quantity,
            UnitPrice = product.Price + productVariant.PriceAdjustment,
            DiscountPercent = orderItemDto.DiscountPercent,
            TotalPrice = (product.Price + productVariant.PriceAdjustment) * orderItemDto.Quantity
        };
        
        await orderItemRepository.AddAsync(orderItem);
        return responseHandlingHelper.Created("Order Item has been successfully created.", orderItem);
    }
}