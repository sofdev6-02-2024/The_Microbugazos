using InventoryService.Application.Dtos.Images;
using InventoryService.Application.QueryCommands.Images.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.CommandHandlers;

public class UpdateImageCommandHandler(IRepository<Image> imageRepository) : IRequestHandler<UpdateImageCommand, ImageDto>
{
    public async Task<ImageDto> Handle(UpdateImageCommand request, CancellationToken cancellationToken)
    {
        var imageDto = request.Image;
        var imageToUpdate = await imageRepository.GetByIdAsync(imageDto.ImageId);        
        if (imageToUpdate == null) throw new ArgumentException("The requested image was not found.");
        
        imageToUpdate.Url = imageDto.Url ?? imageToUpdate.Url;
        imageToUpdate.AltText = imageDto.AltText ?? imageToUpdate.AltText;
        imageToUpdate.IsActive = imageDto.IsActive ?? imageToUpdate.IsActive;
        
        await imageRepository.UpdateAsync(imageToUpdate);
        return new ImageDto
        {
            ImageId = imageToUpdate.Id,
            ProductId = imageToUpdate.ProductId,
            Url = imageToUpdate.Url,
            AltText = imageToUpdate.AltText,
            IsActive = imageToUpdate.IsActive
        };
    }
}