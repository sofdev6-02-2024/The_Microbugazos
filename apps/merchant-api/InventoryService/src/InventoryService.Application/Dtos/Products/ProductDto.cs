using InventoryService.Application.Dtos.ProductVariants;

namespace InventoryService.Application.Dtos.Products;

public class ProductDto
{
    public Guid ProductId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public string Brand { get; set; }
    public List<ProductCategory> Categories { get; set; }
    public List<ProductVariantImageDto> Images { get; set; }
    public List<ProductVariantDto> ProductVariants { get; set; }
    
    
}