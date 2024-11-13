using InventoryService.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.Commands;

public class DeleteImageCommand(Guid id) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
}