using Commons.ResponseHandler.Responses.Bases;
using Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.Services;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace DefaultNamespace;

public class GetProductsByStoreQueryHandler(
    IProductRepository productRepository, 
    ProductService productService, 
    IResponseHandlingHelper responseHandlingHelper) : IRequestHandler<GetProductsByStore, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetProductsByStore request, CancellationToken cancellationToken)
    {
        var storeProducts = await productRepository.GetProductsByStore(
            request.StoreId,
            request.Page,
            request.PageSize,
            request.QueryParams);
        var storeProductsDto = storeProducts
            .Select(product => productService.GetProductDtoByProduct(product).Result)
            .ToList();

        var existingItems = await productRepository.GetCountProductsByStore(
            request.StoreId,
            request.Page,
            request.PageSize,
            request.QueryParams);
        
        var productsToDisplay = new PaginatedResponseDto<ProductDto>
        {
            Items = storeProductsDto, 
            TotalCount = storeProductsDto.Count,
            ExistingElements = existingItems,
            Page = request.Page, 
            PageSize = request.PageSize
        };
        
        return responseHandlingHelper.Ok("Products have been successfully obtained.", productsToDisplay);    
    }
}