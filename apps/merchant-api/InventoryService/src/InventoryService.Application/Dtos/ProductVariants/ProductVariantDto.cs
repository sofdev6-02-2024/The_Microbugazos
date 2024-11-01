namespace InventoryService.Application.Dtos.ProductVariants;

public class ProductVariantDto
{
    public Guid ProductVariantId { get; set; }
    public Guid ProductId { get; set; }
    public ProductVariantImageDto? ProductVariantImage { get; set; }
    public double PriceAdjustment { get; set; }
    public int StockQuantity { get; set; }
    public List<ProductVariantAttributeDto> Attributes { get; set; }
}