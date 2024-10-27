using InventoryService.Domain.Bases;

namespace InventoryService.Domain.Concretes;

public class ProductVariant : BaseEntity
{
    public Guid ProductId { get; set; }
    public Guid? ImageId { get; set; }
    public double PriceAdjustment { get; set; }
    public int StockQuantity { get; set; }
    public Product Product { get; set; }
    public Image Image { get; set; }
    public ICollection<ProductAttribute> Attributes { get; set; }
}