namespace InventoryService.Application.Dtos.Reservations;

public class ProductReservationDto
{
    public Guid Id { get; set; }
    public Guid VariantId { get; set; }
    public int Quantity { get; set; }
}