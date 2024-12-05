using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.QueryCommands.Reservations.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Reservations.Commands.CommandHandlers;

public class DeleteReservationCommandHandler(
    IRepository<InventoryReservation> repository,
    IProductReservationRepository productReservationRepository,
    IResponseHandlingHelper responseHandlingHelper
) : IRequestHandler<DeleteReservationCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(DeleteReservationCommand request, CancellationToken cancellationToken)
    {
        var reservation = await repository.GetByIdAsync(request.Id);

        if (reservation == null)
            return responseHandlingHelper.NotFound<InventoryReservation>("The reservation with the follow id " + request.Id + " was not found");

        var response = await repository.DeleteAsync(request.Id);

        return responseHandlingHelper.Ok("The reservation has been deleted successfully", response);
    }
}