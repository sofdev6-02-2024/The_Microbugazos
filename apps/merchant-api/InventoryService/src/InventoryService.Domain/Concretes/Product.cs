using InventoryService.Domain.Bases;

namespace InventoryService.Domain.Concretes;

public class Product : BaseEntity
{
    public Guid? StoreId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public double BasePrice { get; set; }
    public string Brand { get; set; }
    public ICollection<Image> Images { get; set; }
    public ICollection<ProductVariant> ProductVariants { get; set; }
    public ICollection<Category> Categories { get; set; }
    public ICollection<ProductReview> ProductReviews { get; set; }
}