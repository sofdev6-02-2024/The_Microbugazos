using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.ProductVariants;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Queries.Queries;

public class GetProductsVariantsBySpecificProductQuery(Guid id, int page, int pageSize) : IRequest<PaginatedResponseDto<ProductVariantDto>>
{
    public Guid IdProduct { get; set; } = id;
    public int Page { get; set; } = page; 
    public int PageSize { get; set; } = pageSize;
}