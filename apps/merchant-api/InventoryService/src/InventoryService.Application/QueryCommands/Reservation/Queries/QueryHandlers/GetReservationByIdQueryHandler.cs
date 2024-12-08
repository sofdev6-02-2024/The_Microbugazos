using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Reservations;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Reservations.Queries.Queries;

public class GetReservationByIdQueryHandler(
    IRepository<InventoryReservation> repository,
    IProductReservationRepository productReservationRepository,
    IResponseHandlingHelper responseHandlingHelper
) : IRequestHandler<GetReservationByIdQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetReservationByIdQuery request, CancellationToken cancellationToken)
    {
        var existingReservation = await repository.GetByIdAsync(request.Id);

        if (existingReservation == null)
            return responseHandlingHelper.NotFound<InventoryReservationDto>("The reservation with the follow id " + request.Id + " was not found");

        var existingProductReservations = await productReservationRepository.GetAllByInventoryIdAsync(existingReservation.Id);

        var productReservations = existingProductReservations.Select(product => new ProductReservationDto
        {
            Id = product.Id,
            VariantId = product.ProductVariantId,
            Quantity = product.Quantity
        }).ToList();

        var inventoryReservationDto = new InventoryReservationDto
        {
            Id = existingReservation.Id,
            Products = productReservations,
            ReservationDate = existingReservation.SavedDate,
            ReservationStatus = existingReservation.ReservationStatus
        };

        return responseHandlingHelper.Ok("Reservation have been successfully obtained", inventoryReservationDto);
    }
}