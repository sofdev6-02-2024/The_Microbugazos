using InventoryService.Application.Dtos.Products;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Commands.Commands;

public class CreateProductCommand(CreateProductDto productDto) : IRequest<BaseResponse>
{
    public CreateProductDto ProductDto { get; } = productDto;
}