using InventoryService.Application.QueryCommands.Categories.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.CommandHandlers;

public class DeleteCategoryCommandHandler(IRepository<Category> categoryRepository) : 
    IRequestHandler<DeleteCategoryCommand, bool>
{
    public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        return await categoryRepository.DeleteAsync(request.Id);
    }
}