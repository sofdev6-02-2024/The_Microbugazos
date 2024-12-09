using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.QueryCommands.Reservations.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Reservations.Commands.CommandHandlers;

public class UpdateReservationStatusCommandHandler(
    IRepository<InventoryReservation> reservationRepository,
    IResponseHandlingHelper responseHandlingHelper
) : IRequestHandler<UpdateReservationStatusCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(UpdateReservationStatusCommand request, CancellationToken cancellationToken)
    {
        var reservation = await reservationRepository.GetByIdAsync(request.Id);

        if (reservation is null)
            return responseHandlingHelper.NotFound<InventoryReservation>($"The reservation with the follow id {request.Id} was not found");

        reservation.ReservationStatus = request.Status;

        var response = await reservationRepository.UpdateAsync(reservation);

        return responseHandlingHelper.Ok("The reservation status has been updated successfully", response);
    }
}