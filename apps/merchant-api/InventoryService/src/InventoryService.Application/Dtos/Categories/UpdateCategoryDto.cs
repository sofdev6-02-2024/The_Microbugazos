namespace InventoryService.Application.Dtos.Categories;

public class UpdateCategoryDto
{
    public Guid Id { get; set; }
    public Guid? ParentCategoryId { get; set; }
    public string? Name {get; set;}
}