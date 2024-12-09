using InventoryService.Domain.Bases;

namespace InventoryService.Domain.Concretes;

public class Product : BaseEntity
{
    public Guid? StoreId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public double BasePrice { get; set; }
    public string Brand { get; set; } = string.Empty;
    public int? LowStockThreshold { get; set; }
    public float Rating { get; set; } = 0; 
    public ICollection<Image> Images { get; set; } = new List<Image>();
    public ICollection<ProductVariant> ProductVariants { get; set; } = new List<ProductVariant>();
    public ICollection<Category> Categories { get; set; } = new List<Category>();
    public ICollection<WishList> WishList { get; set; } = new List<WishList>();
}