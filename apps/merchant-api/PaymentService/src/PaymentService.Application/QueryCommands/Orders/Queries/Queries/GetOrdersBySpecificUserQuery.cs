using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace PaymentService.Application.QueryCommands.Orders.Queries.Queries;

public class GetOrdersBySpecificUserAndDateQuery(Guid userId, int page, int pageSize) : IRequest<BaseResponse>
{
    public Guid UserId { get; set; } = userId;
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
}