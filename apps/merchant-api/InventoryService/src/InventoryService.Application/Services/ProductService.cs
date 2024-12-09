using InventoryService.Application.Dtos.Products;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Domain.Concretes;

namespace InventoryService.Application.Services;

public class ProductService
{
    public ProductDto GetProductDtoByProduct(Product existingProduct, List<Guid> productsLiked)
    {
        var isLiked = productsLiked.Contains(existingProduct.Id);
        
        var categoriesDto = existingProduct.Categories.Select(category
            => new ProductCategory{ Id = category.Id, Name = category.Name }).ToList();

        return new ProductDto
        {
            Id = existingProduct.Id,
            StoreId = existingProduct.StoreId,
            Name = existingProduct.Name,
            Description = existingProduct.Description,
            IsLiked = isLiked,
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
        };
    }
}