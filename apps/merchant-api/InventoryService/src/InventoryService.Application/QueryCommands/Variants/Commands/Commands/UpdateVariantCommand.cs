using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.Variants;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.Commands;

public class UpdateVariantCommand(UpdateVariantDto variant) : IRequest<BaseResponse>
{
    public UpdateVariantDto Variant { get; } = variant;
}