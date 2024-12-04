using InventoryService.Domain.Bases;

namespace InventoryService.Domain.Concretes;

public class ProductReservation : BaseEntity
{
    public Guid InventoryReservationId { get; set; } = Guid.Empty;
    public Guid ProductVariantId { get; set; } = Guid.Empty;
    public int Quantity { get; set; } = 0;
    public InventoryReservation? InventoryReservation { get; set; }
}