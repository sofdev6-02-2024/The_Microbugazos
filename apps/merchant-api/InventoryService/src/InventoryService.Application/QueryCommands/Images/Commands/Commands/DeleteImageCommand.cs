using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.Commands;

public class DeleteImageCommand(Guid id) : IRequest<bool>
{
    public Guid Id { get; set; } = id;
}