using InventoryService.Domain.bases;

namespace InventoryService.Domain.concretes;

public class ProductAttribute : BaseEntity
{
    public Guid ProductVariantId { get; set; }
    public Guid VariantId { get; set; }
    public string Value { get; set; }
    public ProductVariant ProductVariant { get; set; }
    public Variant Variant { get; set; }
}