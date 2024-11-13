using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Queries.Queries;

public class GetProductVariantByIdQuery(Guid id) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
}