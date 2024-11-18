namespace InventoryService.Application.ValidatorSettings;

public class ProductSettings
{
    public int ProductNameMinLength { get; set; }
    public int ProductNameMaxLength { get; set; }
    public int ProductDescriptionMinLength { get; set; }
    public int ProductDescriptionMaxLenght { get; set; }
    public int PriceMinLenght { get; set; }
    public int ProductBrandMinLength { get; set; }
    public int ProductBrandMaxLength { get; set; }
}