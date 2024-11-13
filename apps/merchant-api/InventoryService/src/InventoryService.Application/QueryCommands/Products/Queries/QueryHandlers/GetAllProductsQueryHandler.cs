using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.QueryCommands.Products.Queries.Queries;
using InventoryService.Application.Services;
using InventoryService.Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Queries.QueryHandlers;

public class GetAllProductsQueryHandler(IRepository<Product> productRepository, 
    ProductService productService, 
    IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<GetAllProductsQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        var totalProducts = await productRepository.GetAllAsync(request.Page, request.PageSize);
        var totalProductsDto = totalProducts.Select(
            product => productService.GetProductDtoByProduct(product).Result).ToList();
        
        var productsToDisplay = new PaginatedResponseDto<ProductDto>
        {
            Items = totalProductsDto, 
            TotalCount = totalProductsDto.Count, 
            Page = request.Page, 
            PageSize = request.PageSize
        };
        return responseHandlingHelper.Ok("Products have been successfully obtained.", productsToDisplay);    
    }
}