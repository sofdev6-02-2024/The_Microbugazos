using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using InventoryService.Application.Dtos.Reservations;
using InventoryService.Application.QueryCommands.Reservations.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Reservations.Commands.CommandHandlers;

public class CreateReservationCommandHandler(
    IValidator<CreateReservationDto> validator,
    IRepository<InventoryReservation> reservationRepository,
    IRepository<ProductReservation> productReservationRepository,
    IResponseHandlingHelper responseHandlingHelper
) : IRequestHandler<CreateReservationCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(CreateReservationCommand request, CancellationToken cancellationToken)
    {
        var reservationDto = request.CreateReservationDto;
        var response = await validator.ValidateAsync(reservationDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<CreateReservationDto>(
            "The operation to create a reservation was not completed, please check the errors.",
            response.Errors.Select(e => e.ErrorMessage).ToList());

        var reservationToAdd = await reservationRepository.AddAsync(
            new InventoryReservation
            {
                ClientId = reservationDto.ClientId,
                SavedDate = DateTime.UtcNow
            }
        );

        foreach (var item in reservationDto.Products)
        {
            await productReservationRepository.AddAsync(
                new ProductReservation
                {
                    InventoryReservationId = reservationToAdd.Id,
                    ProductVariantId = item.VariantId,
                    Quantity = item.Quantity
                }
            );
        }

        return responseHandlingHelper.Created(
            "The reservation was added successfully", reservationToAdd.Id
        );
    }
}