using InventoryService.Application.QueryCommands.Images.Commands.Commands;
using InventoryService.Application.QueryCommands.Variants.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.CommandHandlers;

public class DeleteVariantCommandHandler(IRepository<Variant> variantRepository)
    : IRequestHandler<DeleteVariantCommand, bool>
{
    public async Task<bool> Handle(DeleteVariantCommand request, CancellationToken cancellationToken)
    {
        return await variantRepository.DeleteAsync(request.Id);
    }
}