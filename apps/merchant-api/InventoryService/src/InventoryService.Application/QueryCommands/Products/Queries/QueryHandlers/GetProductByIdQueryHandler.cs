using InventoryService.Application.Dtos.Products;
using InventoryService.Application.QueryCommands.Products.Queries.Queries;
using InventoryService.Application.Services;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Queries.QueryHandlers;

public class GetProductByIdQueryHandler(IRepository<Product> productRepository, ProductService productService)
    : IRequestHandler<GetProductByIdQuery, ProductDto?>
{
    public async Task<ProductDto?> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var existingProduct = await productRepository.GetByIdAsync(request.Id);
        if (existingProduct == null)
            throw new KeyNotFoundException($"Product with ID {request.Id} not found.");

        var productDto = productService.GetProductDtoByProduct(existingProduct).Result;
        return productDto;
    }
}