namespace InventoryService.Application.Dtos.ProductVariants;

public class ProductVariantAttributeDto
{
    public string Name { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;

    protected bool Equals(ProductVariantAttributeDto other)
    {
        return Name == other.Name && Value == other.Value;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Name, Value);
    }
}