using InventoryService.Application.Dtos.Products;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Queries.Queries;

public class GetProductByIdQuery(Guid id) : IRequest<ProductDto?>
{
    public Guid Id { get; set; } = id;
}