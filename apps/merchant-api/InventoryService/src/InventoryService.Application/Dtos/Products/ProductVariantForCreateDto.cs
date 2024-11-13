using InventoryService.Application.Dtos.ProductVariants;

namespace InventoryService.Application.Dtos.Products;

public class ProductVariantForCreateDto
{
    public ProductVariantImageDto? Image { get; set; }
    public double PriceAdjustment { get; set; }
    public int StockQuantity { get; set; }
    public List<ProductVariantAttributeDto> Attributes { get; set; } = [];
}