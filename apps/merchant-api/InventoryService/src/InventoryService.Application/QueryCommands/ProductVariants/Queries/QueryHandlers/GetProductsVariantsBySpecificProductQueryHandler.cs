using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.ProductVariants.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Queries.QueryHandlers;

public class GetProductsVariantsBySpecificProductQueryHandler(
    IRepository<Product> productRepository,
    IRepository<ProductVariant> productVariantRepository, 
    IResponseHandlingHelper responseHandlingHelper) :
    IRequestHandler<GetProductsVariantsBySpecificProductQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetProductsVariantsBySpecificProductQuery request,
        CancellationToken cancellationToken)
    {
        var product = await productRepository.GetByIdAsync(request.IdProduct);
        if (product == null)
            return responseHandlingHelper.NotFound<Product>("The product with the follow id " + request.IdProduct + " was not found");
        
        var totalProductVariants = await productVariantRepository.GetAllAsync(request.Page, request.PageSize);
        var totalProductVariantDto = totalProductVariants
            .Where(existingProductVariant => existingProductVariant.ProductId == request.IdProduct)
            .Select(existingProductVariant => new ProductVariantDto
            {
                ProductVariantId = existingProductVariant.Id,
                ProductVariantImage = new ProductVariantImageDto
                {
                    AltText = existingProductVariant.Image?.AltText!,
                    Url = existingProductVariant.Image?.Url!
                },
                ProductId = existingProductVariant.ProductId,
                PriceAdjustment = existingProductVariant.PriceAdjustment,
                StockQuantity = existingProductVariant.StockQuantity,
                Attributes = existingProductVariant.Attributes.Select(currentProductAttribute => new GetProductVariantAttributeDto
                {
                    ProductVariantAttributeId = currentProductAttribute.Id,
                    Name = currentProductAttribute.Variant?.Name!,
                    Value = currentProductAttribute.Value
                }).ToList()
            }).ToList();
        return responseHandlingHelper.Ok("Product variants have been successfully obtained.",  new PaginatedResponseDto<ProductVariantDto>
        {
            Items = totalProductVariantDto,
            TotalCount = totalProductVariantDto.Count,
            Page = request.Page,
            PageSize = request.PageSize
        });
    }
}