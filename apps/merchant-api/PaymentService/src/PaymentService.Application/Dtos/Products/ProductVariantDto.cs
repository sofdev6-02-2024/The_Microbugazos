namespace PaymentService.Application.Dtos.Products;

public class ProductVariantDto
{
    public Guid ProductVariantId { get; set; }
    public Guid ProductId { get; set; }
    public ProductVariantImageDto? ProductVariantImage { get; set; }
    public double PriceAdjustment { get; set; }
    public int StockQuantity { get; set; }
    public List<GetProductVariantAttributeDto> Attributes { get; set; } = [];
}