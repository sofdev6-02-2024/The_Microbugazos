using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Reservations;
using MediatR;

namespace InventoryService.Application.QueryCommands.Reservations.Commands.Commands;

public class CreateReservationCommand(CreateReservationDto createReservationDto) : IRequest<BaseResponse>
{
    public CreateReservationDto CreateReservationDto { get; set; } = createReservationDto;
}