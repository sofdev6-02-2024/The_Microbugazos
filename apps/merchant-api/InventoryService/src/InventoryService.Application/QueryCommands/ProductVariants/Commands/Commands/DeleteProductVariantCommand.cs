using InventoryService.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;

public class DeleteProductVariantCommand(Guid id) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
}