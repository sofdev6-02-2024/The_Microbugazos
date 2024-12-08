using InventoryService.Domain.Bases;
using InventoryService.Domain.Enums;

namespace InventoryService.Domain.Concretes;

public class InventoryReservation : BaseEntity
{
    public Guid ClientId { get; set; } = Guid.Empty;
    public ICollection<ProductReservation> Products { get; set; } = new List<ProductReservation>();
    public DateTime SavedDate { get; set; } = DateTime.Now;
    public ReservationStatus ReservationStatus { get; set; } = ReservationStatus.RESERVED;
}