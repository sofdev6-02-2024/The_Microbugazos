using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;

public class CreateProductVariantCommand(CreateProductVariantDto productVariant) : IRequest<BaseResponse>
{
    public CreateProductVariantDto ProductVariant { get; } = productVariant;
}