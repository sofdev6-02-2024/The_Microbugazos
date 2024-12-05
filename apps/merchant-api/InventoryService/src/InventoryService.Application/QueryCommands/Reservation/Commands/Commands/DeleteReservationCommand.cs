using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Reservations.Commands.Commands;

public class DeleteReservationCommand(Guid id) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
}