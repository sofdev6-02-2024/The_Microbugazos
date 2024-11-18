using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.QueryCommands.Images.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.CommandHandlers;

public class UpdateImageCommandHandler(
    IValidator<UpdateImageDto> validator,
    IRepository<Image> imageRepository, 
    IResponseHandlingHelper responseHandlingHelper) : IRequestHandler<UpdateImageCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(UpdateImageCommand request, CancellationToken cancellationToken)
    {
        var imageDto = request.Image;
        var imageToUpdate = await imageRepository.GetByIdAsync(imageDto.ImageId);        
        if (imageToUpdate == null) return responseHandlingHelper.NotFound<Image>($"The image with the follow id '{imageDto.ImageId}' was not found.");        
        
        var response = await validator.ValidateAsync(imageDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<UpdateImageDto>(
            "The operation to update the image was not completed, please check the errors.", 
            response.Errors.Select(e => e.ErrorMessage).ToList());
        
        imageToUpdate.Url = imageDto.Url ?? imageToUpdate.Url;
        imageToUpdate.AltText = imageDto.AltText ?? imageToUpdate.AltText;
        imageToUpdate.IsActive = imageDto.IsActive ?? imageToUpdate.IsActive;
        
        await imageRepository.UpdateAsync(imageToUpdate);
        var imageToDisplay = new ImageDto
        {
            ImageId = imageToUpdate.Id,
            ProductId = imageToUpdate.ProductId,
            Url = imageToUpdate.Url,
            AltText = imageToUpdate.AltText,
            IsActive = imageToUpdate.IsActive
        };
        return responseHandlingHelper.Ok("The image has been successfully updated.", imageToDisplay);

    }
}