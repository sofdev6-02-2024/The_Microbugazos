using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.ProductVariants;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;

public class ReduceStockProductVariantCommand(ReduceStockProductVariantDto reduceStockProductVariant) : IRequest<BaseResponse>
{
    public ReduceStockProductVariantDto ReduceStockProductVariant { get; } = reduceStockProductVariant;
}