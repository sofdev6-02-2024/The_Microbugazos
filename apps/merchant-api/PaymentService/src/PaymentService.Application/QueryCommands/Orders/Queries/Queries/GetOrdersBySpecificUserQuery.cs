using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using PaymentService.Commons.Params;

namespace PaymentService.Application.QueryCommands.Orders.Queries.Queries;

public class GetOrdersBySpecificUserQuery(Guid userId, OrderFilterParameters parameters, int page, int pageSize) 
    : IRequest<BaseResponse>
{
    public Guid UserId { get; set; } = userId;
    public OrderFilterParameters FilterParameters { get; set; } = parameters;
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
}