using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.Commands;

public class DeleteVariantCommand(Guid id) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
}