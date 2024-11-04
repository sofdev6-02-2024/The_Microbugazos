using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.ProductVariants;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Queries.Queries;

public class GetAllProductVariantsQuery(int page, int pageSize) : IRequest<PaginatedResponseDto<ProductVariantDto>>
{
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
}