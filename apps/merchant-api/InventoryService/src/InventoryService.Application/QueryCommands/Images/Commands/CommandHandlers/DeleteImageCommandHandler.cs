using InventoryService.Application.QueryCommands.Images.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.CommandHandlers;

public class DeleteImageCommandHandler(IRepository<Image> imageRepository)
    : IRequestHandler<DeleteImageCommand, bool>
{
    public async Task<bool> Handle(DeleteImageCommand request, CancellationToken cancellationToken)
    {
        return await imageRepository.DeleteAsync(request.Id);
    }
}