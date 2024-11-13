using InventoryService.Domain.Bases;

namespace InventoryService.Domain.Concretes;

public class Category : BaseEntity
{
    public Guid? ParentCategoryId { get; set; }
    public string Name { get; set; }  = string.Empty;
    public Category? ParentCategory { get; set; }
    public ICollection<Category> SubCategories { get; set; } = new List<Category>();
    public ICollection<Product> Products { get; set; } = new List<Product>();
}