namespace InventoryService.Application.Dtos.Categories;

using Domain.Concretes;

public class CategoryDto
{
    public Guid? Id { get; set; }
    public string? Name { get; set; }
    public List<string>? SubCategories { get; set; } = new();
}