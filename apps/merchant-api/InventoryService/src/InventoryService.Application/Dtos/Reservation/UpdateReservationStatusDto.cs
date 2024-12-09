using InventoryService.Domain.Enums;

namespace InventoryService.Application.Dtos.Reservations;

public class UpdateReservationStatusDto
{
    public Guid Id { get; set; }
    public ReservationStatus Status { get; set; }
}