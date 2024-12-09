using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Queries.Queries;

public class GetAllProductsQuery(Guid? userId, int page, int pageSize) : IRequest<BaseResponse>
{
    public Guid? UserId { get; set; } = userId;
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
}