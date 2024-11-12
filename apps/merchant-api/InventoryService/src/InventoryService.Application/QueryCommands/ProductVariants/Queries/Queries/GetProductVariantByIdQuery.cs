using InventoryService.Application.Dtos.ProductVariants;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Queries.Queries;

public class GetProductVariantByIdQuery(Guid id) : IRequest<ProductVariantDto?>
{
    public Guid Id { get; set; } = id;
}