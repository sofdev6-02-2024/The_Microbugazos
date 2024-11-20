namespace PaymentService.Application.Dtos.Products;

public class GetProductVariantAttributeDto
{
    public Guid ProductVariantAttributeId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}