using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace PaymentService.Application.QueryCommands.Orders.Queries.Queries;

public class GetAllOrdersQuery(int page, int pageSize) : IRequest<BaseResponse>
{
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
}