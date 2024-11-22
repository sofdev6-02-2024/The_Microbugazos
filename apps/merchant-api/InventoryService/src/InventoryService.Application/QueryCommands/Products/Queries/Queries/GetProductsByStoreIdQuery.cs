using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Intraestructure.Types;
using MediatR;
namespace InventoryService.Application.QueryCommands.Products.Queries.Queries;


public class GetProductsByStoreIdQuery(
    Guid id,
    int page,
    int pageSize,
    SortingType name,
    SortingType price,
    string search
) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
    public SortingType Name { get; set; } = name;
    public SortingType Price { get; set; } = price;
    public string Search { get; set; } = search;
}