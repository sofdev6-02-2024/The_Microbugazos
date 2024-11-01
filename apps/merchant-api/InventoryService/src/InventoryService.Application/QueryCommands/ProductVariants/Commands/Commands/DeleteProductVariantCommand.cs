using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;

public class DeleteProductVariantCommand(Guid id) : IRequest<bool>
{
    public Guid Id { get; set; } = id;
}