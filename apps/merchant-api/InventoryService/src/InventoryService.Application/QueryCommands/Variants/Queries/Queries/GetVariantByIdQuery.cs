using InventoryService.Application.Dtos.Variants;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Queries.Queries;

public class GetVariantByIdQuery(Guid id) : IRequest<VariantDto?>
{
    public Guid Id { get; set; } = id;
}