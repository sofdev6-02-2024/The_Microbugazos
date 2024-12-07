using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Commands.Commands;

public class UpdateProducrThresholdCommand(Guid productId, int threshold) : IRequest<BaseResponse>
{
    public Guid ProductId { get; set; } = productId;
    public int Threshold { get; set; } = threshold;
}