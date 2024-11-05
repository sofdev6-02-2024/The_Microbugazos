using InventoryService.Application.Dtos.ProductVariants;

namespace InventoryService.Application.Dtos.Products;

public class CreateProductDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public string Brand { get; set; }
    public List<Guid> CategoryIds { get; set; }
    public List<ProductVariantImageDto> Images { get; set; }
    public List<ProductVariantForCreateDto> ProductVariants { get; set; }
}