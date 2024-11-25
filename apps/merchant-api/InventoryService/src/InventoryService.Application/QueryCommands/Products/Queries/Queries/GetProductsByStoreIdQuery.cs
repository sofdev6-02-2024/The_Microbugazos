using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Commons.Params;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Queries.Queries;

public class GetProductsByStoreIdQuery(Guid id, int page, int pageSize, ProductFilteringQueryParams queryParams) : IRequest<BaseResponse>
{
    public Guid StoreId { get; set; } = id;
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
    public ProductFilteringQueryParams QueryParams { get; set; } = queryParams;
}