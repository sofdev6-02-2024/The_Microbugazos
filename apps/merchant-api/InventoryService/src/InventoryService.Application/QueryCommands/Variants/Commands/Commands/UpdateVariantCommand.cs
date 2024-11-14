using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Variants;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.Commands;

public class UpdateVariantCommand(UpdateVariantDto variant) : IRequest<BaseResponse>
{
    public UpdateVariantDto Variant { get; } = variant;
}