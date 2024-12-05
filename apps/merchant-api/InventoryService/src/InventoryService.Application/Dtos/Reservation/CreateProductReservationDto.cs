namespace InventoryService.Application.Dtos.Reservations;

public class CreateProductReservationDto
{
    public Guid VariantId { get; set; }
    public int Quantity { get; set; }
}