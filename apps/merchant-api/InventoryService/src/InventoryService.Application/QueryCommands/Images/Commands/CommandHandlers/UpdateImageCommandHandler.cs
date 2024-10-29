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
        var imageToUpdate = await imageRepository.GetByIdAsync(request.Image.ImageId);        
        if (imageToUpdate == null) throw new ArgumentException("The requested image was not found.");
        
        imageToUpdate.Url = request.Image.Url ?? imageToUpdate.Url;
        imageToUpdate.AltText = request.Image.AltText ?? imageToUpdate.AltText;
        imageToUpdate.IsActive = request.Image.IsActive ?? imageToUpdate.IsActive;
        imageToUpdate.UpdatedAt = DateTime.UtcNow;
        
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