using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.QueryCommands.Images.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Queries.QueryHandlers;

public class GetAllImagesQueryHandler(IRepository<Image> imageRepository)
    : IRequestHandler<GetAllImagesQuery, PaginatedResponseDto<ImageDto>>
{
    public async Task<PaginatedResponseDto<ImageDto>> Handle(GetAllImagesQuery request, CancellationToken cancellationToken)
    {
        var totalImages = await imageRepository.GetAllAsync(request.Page, request.PageSize);
        var count = await imageRepository.GetCountAsync();
        var totalImagesDto = totalImages.Select(image => new ImageDto
            {
                ImageId = image.Id,
                ProductId = image.ProductId,
                Url = image.Url,
                AltText = image.AltText,
                IsActive = image.IsActive
            }).ToList();
        return new PaginatedResponseDto<ImageDto>
        {
            Items = totalImagesDto, 
            TotalCount = count, 
            Page = request.Page, 
            PageSize = request.PageSize
        };
    }
}