using InventoryService.Domain.Bases;

namespace InventoryService.Domain.Concretes;

public class InventoryReservation : BaseEntity
{
    public Guid ClientId { get; set; } = Guid.Empty;
    public ICollection<ProductReservation> ProductReservations { get; set; } = new List<ProductReservation>();
    public DateTime SavedDate { get; set; } = DateTime.Now;
}