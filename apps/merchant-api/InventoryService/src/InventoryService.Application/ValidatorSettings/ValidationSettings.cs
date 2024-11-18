namespace InventoryService.Application.ValidatorSettings;

public class ValidationSettings
{
    public CategorySettings Category { get; set; } = new();
    public ImageSettings Image { get; set; } = new();
    public VariantSettings Variant { get; set; } = new();
    public ProductVariantSettings ProductVariant { get; set; } = new();
    public ProductSettings Product { get; set; } = new();
}