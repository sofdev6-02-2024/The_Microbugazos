using InventoryService.Domain.Bases;

namespace InventoryService.Domain.Concretes;

public class WishList : BaseEntity
{
    public Guid ProductId { get; set; }
    public Guid UserId { get; set; }
    public Product Product { get; set; }
}