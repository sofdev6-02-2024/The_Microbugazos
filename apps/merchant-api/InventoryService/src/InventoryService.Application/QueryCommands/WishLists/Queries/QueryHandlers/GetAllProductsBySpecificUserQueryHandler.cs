using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.QueryCommands.WishLists.Queries.Queries;
using InventoryService.Application.Services;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.WishLists.Queries.QueryHandlers;

public class GetAllProductsBySpecificUserQueryHandler(
    IResponseHandlingHelper responseHandlingHelper,
    IWishListRepository wishListRepository,
    ProductService productService) : IRequestHandler<GetAllProductsBySpecificUserQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetAllProductsBySpecificUserQuery request, CancellationToken cancellationToken)
    {
        var wishListBySpecificUser = await wishListRepository.GetWishListByUserId(request.UserId, 
            request.Page, request.PageSize, request.QueryParams);
        
        var totalCount = await wishListRepository.GetWishListCountByUserId(request.UserId, request.QueryParams);
        var listBySpecificUser = wishListBySpecificUser.ToList();
        if (listBySpecificUser.Count == 0)
            return responseHandlingHelper.Ok("There isn't any products yet.", 
                new PaginatedResponseDto<ProductDto>([], 0,0,0));

        var productsLikedIds = listBySpecificUser.Select(w => w.ProductId).ToList();
        var productsWishListBySpecificUser = listBySpecificUser.Select(wishProduct => 
            productService.GetProductDtoByProduct(wishProduct.Product, productsLikedIds)).ToList();

        return responseHandlingHelper.Ok("The requested products have been successful returned.",
            new PaginatedResponseDto<ProductDto>(productsWishListBySpecificUser, totalCount, request.Page, request.PageSize));
    }
}