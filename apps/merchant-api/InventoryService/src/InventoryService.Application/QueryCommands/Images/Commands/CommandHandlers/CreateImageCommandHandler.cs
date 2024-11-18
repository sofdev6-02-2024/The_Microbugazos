using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.QueryCommands.Images.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.CommandHandlers;

public class CreateImageCommandHandler(
    IValidator<CreateImageDto> validator,
    IRepository<Image> imageRepository, 
    IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<CreateImageCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(CreateImageCommand request, CancellationToken cancellationToken)
    {
        var imageDto = request.Image;
        var response = await validator.ValidateAsync(imageDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<CreateImageDto>(
            "The operation to create an image was not completed, please check the errors.", 
            response.Errors.Select(e => e.ErrorMessage).ToList());
        
        var image = new Image
        {
            ProductId = imageDto.ProductId,
            AltText = imageDto.AltText,
            Url = imageDto.Url
        };

        image = await imageRepository.AddAsync(image);
        return responseHandlingHelper.Created("The image was added successfully.", image.Id);;
    }
}