using InventoryService.Application.Dtos.Images;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.Commands;

public class CreateImageCommand(CreateImageDto image) : IRequest<BaseResponse>
{
    public CreateImageDto Image { get; } = image;
}