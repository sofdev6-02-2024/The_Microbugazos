using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.Commands;

public class DeleteCategoryCommand(Guid id) : IRequest<bool>
{
    public Guid Id { get; set; } = id;
}