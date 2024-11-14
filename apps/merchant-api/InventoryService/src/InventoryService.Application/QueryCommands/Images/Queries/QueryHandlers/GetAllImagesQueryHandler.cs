using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.QueryCommands.Images.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Queries.QueryHandlers;

public class GetAllImagesQueryHandler(IRepository<Image> imageRepository, IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<GetAllImagesQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetAllImagesQuery request, CancellationToken cancellationToken)
    {
        var totalImages = await imageRepository.GetAllAsync(request.Page, request.PageSize);
        var totalImagesDto = totalImages.Select(image => new ImageDto
            {
                ImageId = image.Id,
                ProductId = image.ProductId,
                Url = image.Url,
                AltText = image.AltText,
                IsActive = image.IsActive
            }).ToList();

        var imagesToDisplay = new PaginatedResponseDto<ImageDto>
        {
            Items = totalImagesDto,
            TotalCount = totalImagesDto.Count,
            Page = request.Page,
            PageSize = request.PageSize
        };
        
        return responseHandlingHelper.Ok("Images have been successfully obtained.", imagesToDisplay);    }
}