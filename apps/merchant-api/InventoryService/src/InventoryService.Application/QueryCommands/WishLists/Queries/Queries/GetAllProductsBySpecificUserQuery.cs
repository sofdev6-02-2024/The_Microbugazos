using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Commons.Params;
using MediatR;

namespace InventoryService.Application.QueryCommands.WishLists.Queries.Queries;

public class GetAllProductsBySpecificUserQuery(Guid userId, int page, int pageSize, ProductFilteringQueryParams queryParams) : IRequest<BaseResponse>
{
    public Guid UserId { get; set; } = userId;
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
    public ProductFilteringQueryParams QueryParams { get; set; } = queryParams;
}