using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Variants;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.Commands;

public class CreateVariantCommand(CreateVariantDto variant) : IRequest<BaseResponse>
{
    public CreateVariantDto Variant { get; } = variant;
}