using InventoryService.Domain.Enums;

namespace InventoryService.Application.Dtos.Reservations;

public class InventoryReservationDto
{
    public Guid Id { get; set; }
    public Guid ClientId { get; set; }
    public List<ProductReservationDto> Products { get; set; } = [];
    public DateTime ReservationDate { get; set; }
    public ReservationStatus ReservationStatus { get; set; }
}