using InventoryService.Application.QueryCommands.Variants.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.CommandHandlers;

public class CreateVariantCommandHandler(
    IRepository<Variant> variantRepository) 
    : IRequestHandler<CreateVariantCommand, Variant>
{
    public async Task<Variant> Handle(
        CreateVariantCommand request, 
        CancellationToken cancellationToken)
    {
        ArgumentException.ThrowIfNullOrEmpty(request.Variant.Name, nameof(request.Variant.Name));

        var variant = new Variant
        {
            Name = char.ToUpper(request.Variant.Name[0]) + request.Variant.Name[1..].ToLower()
        };
        return await variantRepository.AddAsync(variant);;
    }
}