using InventoryService.Application.Dtos.ProductVariants;

namespace InventoryService.Application.Dtos.Products;

public class ProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public double Price { get; set; }
    public string Brand { get; set; } = string.Empty;
    public int? LowStockThreshold { get; set; }
    public List<ProductCategory> Categories { get; set; } = [];
    public List<ProductVariantImageDto> Images { get; set; } = [];
    public List<ProductVariantDto> ProductVariants { get; set; } = [];
    
}