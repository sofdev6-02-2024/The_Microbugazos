using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Commands.Commands;

public class DeleteProductCommand(Guid id) : IRequest<bool>
{
    public Guid Id { get; set; } = id;
}