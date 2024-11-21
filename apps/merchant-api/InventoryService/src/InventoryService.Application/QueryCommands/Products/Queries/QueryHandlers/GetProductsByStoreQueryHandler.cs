using Commons.ResponseHandler.Responses.Bases;
using Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.Services;
using InventoryService.Domain.Concretes;
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
            request.PageSize);
        var storeProductsDto = storeProducts
            .Select(product => productService.GetProductDtoByProduct(product).Result)
            .ToList();


        var existingItems = await productRepository.FindAsync(p => p.StoreId == request.StoreId);
        var countExistingItems  = existingItems.Count();
        
        var productsToDisplay = new PaginatedResponseDto<ProductDto>
        {
            Items = storeProductsDto, 
            TotalCount = storeProductsDto.Count,
            ExistingElements = countExistingItems,
            Page = request.Page, 
            PageSize = request.PageSize
        };
        
        return responseHandlingHelper.Ok("Products have been successfully obtained.", productsToDisplay);    
    }
}