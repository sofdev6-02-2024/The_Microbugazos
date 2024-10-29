using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Categories;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Queries.Queries;

public class GetAllCategoriesQuery(int page, int pageSize) : IRequest<PaginatedResponseDto<CategoryDto>>
{
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
}