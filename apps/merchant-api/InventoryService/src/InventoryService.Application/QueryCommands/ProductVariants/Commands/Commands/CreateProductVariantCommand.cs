using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.ProductVariants;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;

public class CreateProductVariantCommand(CreateProductVariantDto productVariant) : IRequest<BaseResponse>
{
    public CreateProductVariantDto ProductVariant { get; } = productVariant;
}