using InventoryService.Domain.Bases;

namespace InventoryService.Domain.Concretes;

public class Category : BaseEntity
{
    public Guid? ParentCategoryId { get; set; }
    public string Name { get; set; }  = string.Empty;
    public Category? ParentCategory { get; set; }
    public ICollection<Category> SubCategories { get; set; } = new List<Category>();
    public ICollection<Product> Products { get; set; } = new List<Product>();



    public override bool Equals(object? obj)
    {
        if (obj is Category other)
        {
            return base.Equals(other) 
                   && Nullable.Equals(ParentCategoryId, other.ParentCategoryId) 
                   && Name == other.Name 
                   && SubCategories.Equals(other.SubCategories);
        }

        return false;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(base.GetHashCode(), ParentCategoryId, Name, SubCategories);
    }
}