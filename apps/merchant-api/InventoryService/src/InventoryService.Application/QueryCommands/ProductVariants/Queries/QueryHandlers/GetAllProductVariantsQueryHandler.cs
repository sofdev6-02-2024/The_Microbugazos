using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.Images.Queries.Queries;
using InventoryService.Application.QueryCommands.ProductVariants.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Queries.QueryHandlers;

public class GetAllProductVariantsQueryHandler(IRepository<ProductVariant> productVariantRepository)
    : IRequestHandler<GetAllProductVariantsQuery, PaginatedResponseDto<ProductVariantDto>>
{
    public async Task<PaginatedResponseDto<ProductVariantDto>> Handle(GetAllProductVariantsQuery request, CancellationToken cancellationToken)
    {
        var totalProductVariants = await productVariantRepository.GetAllAsync(request.Page, request.PageSize);
        var count = await productVariantRepository.GetCountAsync();
        var totalProductVariantDto = totalProductVariants.Select(existingProductVariant => new ProductVariantDto
            {
                ProductVariantId = existingProductVariant.Id,
                ProductVariantImage = new ProductVariantImageDto { AltText = existingProductVariant.Image?.AltText!, 
                    Url = existingProductVariant.Image?.Url! },
                ProductId = existingProductVariant.ProductId,
                PriceAdjustment = existingProductVariant.PriceAdjustment,
                StockQuantity = existingProductVariant.StockQuantity,
                Attributes = existingProductVariant.Attributes.Select(a => new ProductVariantAttributeDto
                {
                    Name = a.Variant.Name,
                    Value = a.Value
                }).ToList()
            }).ToList();
        return new PaginatedResponseDto<ProductVariantDto>
        {
            Items = totalProductVariantDto, 
            TotalCount = count, 
            Page = request.Page, 
            PageSize = request.PageSize
        };
    }
}