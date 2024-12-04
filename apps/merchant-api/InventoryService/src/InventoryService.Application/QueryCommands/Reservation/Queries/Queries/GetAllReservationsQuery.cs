using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Reservations.Queries.Queries;

public class GetAllReservationsQuery(int page, int pageSize) : IRequest<BaseResponse>
{
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
}