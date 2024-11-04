namespace InventoryService.Application.Dtos.ProductVariants;

public class GetProductVariantAttributeDto
{
    public Guid ProductVariantAttributeId { get; set; }
    public string Name { get; set; } 
    public string Value { get; set; } 
}