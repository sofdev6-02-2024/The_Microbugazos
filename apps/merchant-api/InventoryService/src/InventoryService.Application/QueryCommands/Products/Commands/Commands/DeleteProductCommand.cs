using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Commands.Commands;

public class DeleteProductCommand(Guid id) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
}