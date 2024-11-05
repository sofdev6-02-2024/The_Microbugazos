using InventoryService.Application.Dtos.Products;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Commands.Commands;

public class CreateProductCommand(CreateProductDto productDto) : IRequest<string>
{
    public CreateProductDto ProductDto { get; } = productDto;
}