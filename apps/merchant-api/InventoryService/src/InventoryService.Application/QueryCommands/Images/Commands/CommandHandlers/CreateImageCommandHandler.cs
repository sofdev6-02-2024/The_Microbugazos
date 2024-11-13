using InventoryService.Application.QueryCommands.Images.Commands.Commands;
using InventoryService.Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.CommandHandlers;

public class CreateImageCommandHandler(IRepository<Image> imageRepository, IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<CreateImageCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(CreateImageCommand request, CancellationToken cancellationToken)
    {
        var imageDto = request.Image;
        if (string.IsNullOrEmpty(imageDto.Url)) 
            return responseHandlingHelper.NotFound<Category>($"The field url is required to create an image.");
        
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