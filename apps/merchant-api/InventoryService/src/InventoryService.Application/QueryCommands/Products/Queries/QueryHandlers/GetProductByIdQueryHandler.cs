using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.QueryCommands.Products.Queries.Queries;
using InventoryService.Application.Services;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Queries.QueryHandlers;

public class GetProductByIdQueryHandler(
    IRepository<Product> productRepository, 
    ProductService productService, 
    IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<GetProductByIdQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var existingProduct = await productRepository.GetByIdAsync(request.Id);
        if (existingProduct == null)
            return responseHandlingHelper.NotFound<ProductDto>("The product with the follow id " + request.Id + " was not found");

        var productDto = productService.GetProductDtoByProduct(existingProduct).Result;
        return responseHandlingHelper.Ok("The product has been successfully obtained.", productDto);
    }
}