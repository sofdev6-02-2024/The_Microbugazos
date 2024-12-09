

using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.QueryCommands.Products.Queries.Queries;
using InventoryService.Application.Services;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Queries.QueryHandlers;
public class GetProductsByStoreIdQueryHandler(IProductRepository productRepository, ProductService productService,
    IResponseHandlingHelper responseHandlingHelper) : IRequestHandler<GetProductsByStoreIdQuery, BaseResponse>
{

    public async Task<BaseResponse> Handle(GetProductsByStoreIdQuery request, CancellationToken cancellationToken)
    {
        var products = await productRepository.GetProductsByStoreId(request.StoreId, request.Page, request.PageSize, request.QueryParams);

        var productsDto = products.Select(e =>
            productService.GetProductDtoByProduct(e, [])).ToList();

        var totalItems = await productRepository.GetCountProductsByStoreId(request.StoreId, request.QueryParams);

        var productsToDisplay = new PaginatedResponseDto<ProductDto>(productsDto, totalItems, request.Page, request.PageSize);

        return responseHandlingHelper.Ok("Products have been successfully obtained.", productsToDisplay);

    }
}
