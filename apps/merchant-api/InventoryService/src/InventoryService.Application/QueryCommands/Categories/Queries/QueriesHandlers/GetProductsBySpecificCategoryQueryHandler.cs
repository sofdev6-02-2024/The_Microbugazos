using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.QueryCommands.Categories.Queries.Queries;
using InventoryService.Application.Services;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Queries.QueriesHandlers;

public class GetProductsBySpecificCategoryQueryHandler(
    ProductService productService,
    IWishListRepository wishListRepository,
    IRepository<Category> categoryRepository,
    IResponseHandlingHelper responseHandlingHelper) :
    IRequestHandler<GetProductsBySpecificCategoryQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetProductsBySpecificCategoryQuery request, CancellationToken cancellationToken)
    {
        var productsLikedIds = new List<Guid>();
        if (request.UserId != null)
        {
            var totalCount = await wishListRepository.GetWishListCountByUserId((Guid)request.UserId);
            var productsLiked = await wishListRepository.GetWishListByUserId((Guid)request.UserId,  1,totalCount);
            productsLikedIds = productsLiked.Select(w => w.ProductId).ToList();
        }
        
        var category = await categoryRepository.GetByIdAsync(request.IdCategory);
        if (category == null)
            return responseHandlingHelper.NotFound<Category>("The category with the follow id " + request.IdCategory + " was not found");

        var totalProducts = category.Products.Select(e =>
            productService.GetProductDtoByProduct(e, productsLikedIds)).ToList();
        return responseHandlingHelper.Ok("Products have been successfully obtained.", new PaginatedResponseDto<ProductDto>(
            totalProducts, totalProducts.Count, request.Page, request.PageSize
        ));
    }
}