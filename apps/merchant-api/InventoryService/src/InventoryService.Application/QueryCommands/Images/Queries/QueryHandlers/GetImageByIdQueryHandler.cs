using InventoryService.Application.Dtos.Images;
using InventoryService.Application.QueryCommands.Images.Queries.Queries;
using InventoryService.Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Queries.QueryHandlers;

public class GetImageByIdQueryHandler(IRepository<Image> imageRepository, IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<GetImageByIdQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetImageByIdQuery request, CancellationToken cancellationToken)
    {
        var image = await imageRepository.GetByIdAsync(request.Id);
        if (image == null)
            return responseHandlingHelper.NotFound<ImageDto>("The image with the follow id " + request.Id + " was not found");
        
        return responseHandlingHelper.Ok("The image has been successfully obtained.", new ImageDto
        {
            ImageId = image!.Id,
            ProductId = image.ProductId,
            Url = image.Url,
            AltText = image.AltText,
            IsActive = image.IsActive
        });
    }
}