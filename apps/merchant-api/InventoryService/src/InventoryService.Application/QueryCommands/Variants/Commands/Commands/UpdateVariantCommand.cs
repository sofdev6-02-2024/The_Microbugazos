using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.Variants;
using InventoryService.Domain.Concretes;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.Commands;

public class UpdateVariantCommand(UpdateVariantDto variant) : IRequest<VariantDto>
{
    public UpdateVariantDto Variant { get; } = variant;
}