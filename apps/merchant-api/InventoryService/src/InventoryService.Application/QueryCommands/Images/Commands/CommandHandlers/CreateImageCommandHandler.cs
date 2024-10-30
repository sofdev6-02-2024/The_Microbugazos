using InventoryService.Application.QueryCommands.Images.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.CommandHandlers;

public class CreateImageCommandHandler(IRepository<Image> imageRepository)
    : IRequestHandler<CreateImageCommand, Image>
{
    public async Task<Image> Handle(CreateImageCommand request, CancellationToken cancellationToken)
    {
        var imageDto = request.Image;
        if (string.IsNullOrEmpty(imageDto.Url) || imageDto.ProductId == Guid.Empty) 
            throw new ArgumentException("URL and ProductId are required fields.");

        var image = new Image
        {
            ProductId = imageDto.ProductId,
            AltText = imageDto.AltText,
            Url = imageDto.Url
        };

        image = await imageRepository.AddAsync(image);
        return image;
    }
}