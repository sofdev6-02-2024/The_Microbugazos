using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.QueryCommands.Products.Queries.Queries;
using InventoryService.Application.Services;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Queries.QueryHandlers;

public class GetAllProductsQueryHandler(IRepository<Product> productRepository, ProductService productService)
    : IRequestHandler<GetAllProductsQuery, PaginatedResponseDto<ProductDto>>
{
    public async Task<PaginatedResponseDto<ProductDto>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        var totalProducts = await productRepository.GetAllAsync(request.Page, request.PageSize);
        var count = await productRepository.GetCountAsync();
        
        var totalProductsDto = totalProducts.Select(
            product => productService.GetProductDtoByProduct(product).Result).ToList();
        
        return new PaginatedResponseDto<ProductDto>
        {
            Items = totalProductsDto, 
            TotalCount = count, 
            Page = request.Page, 
            PageSize = request.PageSize
        };
    }
}