namespace InventoryService.Application.Dtos.Variants;

public class VariantDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<ValueDto> values { get; set; }
    public bool IsActive { get; set; }
}