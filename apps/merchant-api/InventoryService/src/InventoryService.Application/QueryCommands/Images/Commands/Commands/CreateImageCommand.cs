using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Images;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.Commands;

public class CreateImageCommand(CreateImageDto image) : IRequest<BaseResponse>
{
    public CreateImageDto Image { get; } = image;
}