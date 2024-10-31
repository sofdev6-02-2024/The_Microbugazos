using InventoryService.Application.Dtos.Variants;
using InventoryService.Domain.Concretes;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.Commands;

public class CreateVariantCommand(CreateVariantDto variant) : IRequest<Variant>
{
    public CreateVariantDto Variant { get; } = variant;
}