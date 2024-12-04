using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Reservations;
using InventoryService.Application.QueryCommands.Reservations.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Reservations.Queries.QueryHandlers;

public class GetAllReservationsQueryHandler(
    IRepository<InventoryReservation> repository,
    IResponseHandlingHelper responseHandlingHelper
) : IRequestHandler<GetAllReservationsQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetAllReservationsQuery request, CancellationToken cancellationToken)
    {
        var totalProductReservations = await repository.GetAllAsync(request.Page, request.PageSize);
        var totalProductReservationsDto = totalProductReservations.Select(existingReservation => new InventoryReservationDto
        {
            Id = existingReservation.Id,
            ClientId = existingReservation.ClientId,
            Products = existingReservation.ProductReservations.Select(product => new ProductReservationDto
            {
                Id = product.Id,
                VariantId = product.ProductVariantId,
                Quantity = product.Quantity
            }).ToList(),
            ReservationDate = existingReservation.SavedDate
        }).ToList();
        int totalItems = await repository.GetCountAsync();
        var items = new PaginatedResponseDto<InventoryReservationDto>(totalProductReservationsDto, totalItems, request.Page, request.PageSize);
        return responseHandlingHelper.Ok("Reservations have been successfully obtained", items);
    }
}