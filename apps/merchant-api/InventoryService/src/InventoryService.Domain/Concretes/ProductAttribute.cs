using InventoryService.Domain.Bases;

namespace InventoryService.Domain.Concretes;

public class ProductAttribute : BaseEntity
{
    public Guid ProductVariantId { get; set; }
    public Guid VariantId { get; set; }
    public string Value { get; set; } = string.Empty;
    public ProductVariant? ProductVariant { get; set; }
    public Variant? Variant { get; set; }
}