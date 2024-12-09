using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.QueryCommands.Products.Queries.Queries;
using InventoryService.Application.Services;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Queries.QueryHandlers;

public class GetAllProductsQueryHandler(IProductRepository productRepository, 
    IWishListRepository wishListRepository,
    ProductService productService, 
    IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<GetAllProductsQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        var productsLikedIds = new List<Guid>();
        if (request.UserId != null)
        {
            var totalCount = await wishListRepository.GetWishListCountByUserId((Guid)request.UserId);
            var productsLiked = await wishListRepository.GetWishListByUserId((Guid)request.UserId,  1,totalCount);
            productsLikedIds = productsLiked.Select(w => w.ProductId).ToList();
        }
        
        var totalProducts = await productRepository.GetAllAsync(request.Page, request.PageSize);
        var totalProductsDto = totalProducts.Select(e => 
            productService.GetProductDtoByProduct(e, productsLikedIds)).ToList();
        var totalItems = await productRepository.GetCountAsync();

        var productsToDisplay = new PaginatedResponseDto<ProductDto>(totalProductsDto, totalItems, request.Page, request.PageSize);

        return responseHandlingHelper.Ok("Products have been successfully obtained.", productsToDisplay);    
    }
}