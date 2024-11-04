namespace InventoryService.Application.Dtos.ProductVariants;

public class UpdateProductVariantDto
{
    public Guid ProductVariantId { get; set; }
    public ProductVariantImageDto? Image { get; set; }
    public double? PriceAdjustment { get; set; }
    public int? StockQuantity { get; set; }
    public List<ProductVariantAttributeDto>? Attributes { get; set; }
}