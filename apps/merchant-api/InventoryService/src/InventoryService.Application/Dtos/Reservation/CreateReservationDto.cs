namespace InventoryService.Application.Dtos.Reservations;

public class CreateReservationDto
{
    public Guid ClientId { get; set; }
    public List<CreateProductReservationDto> Products { get; set; } = [];
}