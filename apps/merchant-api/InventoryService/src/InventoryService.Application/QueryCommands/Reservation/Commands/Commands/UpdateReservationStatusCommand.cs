using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Enums;
using MediatR;

namespace InventoryService.Application.QueryCommands.Reservations.Commands.Commands;

public class UpdateReservationStatusCommand(Guid id, ReservationStatus status) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
    public ReservationStatus Status { get; set; } = status;
}