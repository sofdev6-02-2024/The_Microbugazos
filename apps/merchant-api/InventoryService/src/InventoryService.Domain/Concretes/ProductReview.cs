using InventoryService.Domain.bases;

namespace InventoryService.Domain.concretes;

public class ProductReview : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid ProductId { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
}