namespace InventoryService.Application.Dtos.Category;

public class UpdateCategoryDto
{
    public Guid Id { get; set; }
    public Guid? ParentCategoryId { get; set; }
    public string? Name {get; set;}
}