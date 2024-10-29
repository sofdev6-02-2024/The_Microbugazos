namespace InventoryService.Application.Dtos.Category;

public class CreateCategoryDto
{
    public Guid? ParentCategoryId { get; set; }
    public string Name {get; set;}
}