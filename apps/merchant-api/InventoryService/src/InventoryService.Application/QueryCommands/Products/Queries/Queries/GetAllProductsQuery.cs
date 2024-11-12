using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Products;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Queries.Queries;

public class GetAllProductsQuery(int page, int pageSize) : IRequest<PaginatedResponseDto<ProductDto>>
{
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
}