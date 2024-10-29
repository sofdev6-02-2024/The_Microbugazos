namespace InventoryService.Application.Dtos.Categories;

using Domain.Concretes;

public class CategoryDto
{
    public string? FatherCategoryName { get; set; }
    public Guid? Id { get; set; }
    public string? Name { get; set; }
}