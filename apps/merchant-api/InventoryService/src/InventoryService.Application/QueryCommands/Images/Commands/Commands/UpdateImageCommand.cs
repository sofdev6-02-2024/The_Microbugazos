using InventoryService.Application.Dtos.Images;
using InventoryService.Domain.Concretes;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.Commands;

public class UpdateImageCommand(UpdateImageDto image) : IRequest<ImageDto>
{
    public UpdateImageDto Image { get; } = image;
}