namespace InventoryService.Application.Dtos.Variants;

public class UpdateVariantDto
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public bool? IsActive { get; set; }
}