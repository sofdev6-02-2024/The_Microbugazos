using InventoryService.Application.Dtos.Images;
using InventoryService.Application.QueryCommands.Images.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Queries.QueryHandlers;

public class GetImageByIdQueryHandler(IRepository<Image> imageRepository)
    : IRequestHandler<GetImageByIdQuery, ImageDto?>
{
    public async Task<ImageDto?> Handle(GetImageByIdQuery request, CancellationToken cancellationToken)
    {
        var image = await imageRepository.GetByIdAsync(request.Id);
        return new ImageDto
        {
            ImageId = image!.Id,
            ProductId = image.ProductId,
            Url = image.Url,
            AltText = image.AltText,
            IsActive = image.IsActive
        };
    }
}