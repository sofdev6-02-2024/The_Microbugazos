using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.ProductVariants.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Queries.QueryHandlers;

public class GetAllProductVariantsQueryHandler(IRepository<ProductVariant> productVariantRepository, 
    IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<GetAllProductVariantsQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetAllProductVariantsQuery request, CancellationToken cancellationToken)
    {
        var totalProductVariants = await productVariantRepository.GetAllAsync(request.Page, request.PageSize);
        var totalProductVariantDto = totalProductVariants.Select(existingProductVariant => new ProductVariantDto
            {
                ProductVariantId = existingProductVariant.Id,
                ProductVariantImage = new ProductVariantImageDto { AltText = existingProductVariant.Image?.AltText!, 
                    Url = existingProductVariant.Image?.Url! },
                ProductId = existingProductVariant.ProductId,
                PriceAdjustment = existingProductVariant.PriceAdjustment,
                StockQuantity = existingProductVariant.StockQuantity,
                Attributes = existingProductVariant.Attributes.Select(currentProductAttribute => new GetProductVariantAttributeDto
                {
                    ProductVariantAttributeId = currentProductAttribute.Id,
                    Name = currentProductAttribute.Variant!.Name,
                    Value = currentProductAttribute.Value
                }).ToList()
            }).ToList();
        
        return responseHandlingHelper.Ok("Product variants have been successfully obtained.", new PaginatedResponseDto<ProductVariantDto>
        {
            Items = totalProductVariantDto, 
            TotalCount = totalProductVariantDto.Count,
            ExistingElements = await productVariantRepository.GetCountAsync(),
            Page = request.Page, 
            PageSize = request.PageSize
        });
    }
}