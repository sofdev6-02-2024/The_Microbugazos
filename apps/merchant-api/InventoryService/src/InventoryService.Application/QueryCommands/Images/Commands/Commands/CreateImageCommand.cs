using InventoryService.Application.Dtos.Images;
using InventoryService.Domain.Concretes;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.Commands;

public class CreateImageCommand(CreateImageDto image) : IRequest<Image>
{
    public CreateImageDto Image { get; } = image;
}