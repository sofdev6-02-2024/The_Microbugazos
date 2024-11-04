using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Domain.Concretes;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;

public class CreateProductVariantCommand(CreateProductVariantDto productVariant) : IRequest<ProductVariantDto>
{
    public CreateProductVariantDto ProductVariant { get; } = productVariant;
}