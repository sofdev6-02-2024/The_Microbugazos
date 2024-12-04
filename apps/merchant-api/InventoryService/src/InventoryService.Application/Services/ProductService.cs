using InventoryService.Application.Dtos.Products;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Domain.Concretes;

namespace InventoryService.Application.Services;

public class ProductService
{
    public Task<ProductDto> GetProductDtoByProduct(Product existingProduct)
    {
        var categoriesDto = existingProduct.Categories.Select(category
            => new ProductCategory{ Id = category.Id, Name = category.Name }).ToList();

        return Task.FromResult(new ProductDto
        {
            Id = existingProduct.Id,
            Name = existingProduct.Name,
            Description = existingProduct.Description,
            Price = existingProduct.BasePrice,
            Brand = existingProduct.Brand,
            Categories = categoriesDto,
            Images = existingProduct.Images.Where(i => i.IsActive).Select(i => new ProductVariantImageDto
            {
                AltText = i.AltText, Url = i.Url
            }).ToList(),
            LowStockThreshold = existingProduct.LowStockThreshold,
            ProductVariants =  existingProduct.ProductVariants.Select(pv => new ProductVariantDto
            {
                ProductVariantId = pv.Id, ProductId = existingProduct.Id, 
                ProductVariantImage = pv.Image != null ? new ProductVariantImageDto { AltText = pv.Image!.AltText, Url = pv.Image!.Url } : null,
                PriceAdjustment = pv.PriceAdjustment, StockQuantity = pv.StockQuantity, 
                Attributes = pv.Attributes.Select(pa => new GetProductVariantAttributeDto { ProductVariantAttributeId = pa.Id, Name = pa.Variant.Name, Value = pa.Value}).ToList()
            }).ToList()
        });
    }
}