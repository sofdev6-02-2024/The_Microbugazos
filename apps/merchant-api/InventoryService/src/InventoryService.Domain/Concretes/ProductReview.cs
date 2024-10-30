using InventoryService.Domain.Bases;

namespace InventoryService.Domain.Concretes;

public class ProductReview : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid ProductId { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public Product Product { get; set; }
}