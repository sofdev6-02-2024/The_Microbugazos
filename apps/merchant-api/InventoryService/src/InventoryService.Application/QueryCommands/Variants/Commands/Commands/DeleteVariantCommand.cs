using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.Commands;

public class DeleteVariantCommand(Guid id) : IRequest<bool>
{
    public Guid Id { get; set; } = id;
}