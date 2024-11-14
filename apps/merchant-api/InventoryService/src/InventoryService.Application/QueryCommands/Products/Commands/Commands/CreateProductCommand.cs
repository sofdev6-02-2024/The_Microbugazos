using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Products;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Commands.Commands;

public class CreateProductCommand(CreateProductDto productDto) : IRequest<BaseResponse>
{
    public CreateProductDto ProductDto { get; } = productDto;
}