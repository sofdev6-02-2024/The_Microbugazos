using InventoryService.Application.Dtos.ProductVariants;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;

public class UpdateProductVariantCommand(UpdateProductVariantDto productVariant) : IRequest<ProductVariantDto>
{
    public UpdateProductVariantDto ProductVariant { get; } = productVariant;
}