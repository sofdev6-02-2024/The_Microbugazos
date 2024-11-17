using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Queries.Queries;

public class GetProductsBySpecificCategoryQuery(Guid id, int page, int pageSize): IRequest<BaseResponse>
{
    public Guid IdCategory { get; set; } = id;
    public int Page { get; set; } = page; 
    public int PageSize { get; set; } = pageSize;
}