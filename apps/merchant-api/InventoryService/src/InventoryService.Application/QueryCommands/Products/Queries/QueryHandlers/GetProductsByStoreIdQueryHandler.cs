

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
        var products = await productRepository.GetProductByStoreId(request.Id, request.Page, request.PageSize, [
            ("Name", request.Name),
            ("BasePrice", request.Price)
        ], request.Search);

        List<ProductDto> productsDto = products.Select(
            product => productService.GetProductDtoByProduct(product).Result).ToList();

        int totalItems = await productRepository.GetCountAsync((product) => product.StoreId == request.Id && product.IsActive == true && product.Name.ToLower().Contains(request.Search.ToLower()));

        var productsToDisplay = new PaginatedResponseDto<ProductDto>(productsDto, totalItems, request.Page, request.PageSize);

        return responseHandlingHelper.Ok("Products have been successfully obtained.", productsToDisplay);

    }
}
