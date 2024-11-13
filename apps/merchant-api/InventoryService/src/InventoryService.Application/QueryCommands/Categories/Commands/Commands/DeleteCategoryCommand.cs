using InventoryService.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.Commands;

public class DeleteCategoryCommand(Guid id) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
}