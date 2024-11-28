using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Products;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Commands.Commands;

public class UpdateProductCommand(Guid id, UpdateProductDto productDto) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
    public UpdateProductDto ProductDto { get; set; } = productDto;
}