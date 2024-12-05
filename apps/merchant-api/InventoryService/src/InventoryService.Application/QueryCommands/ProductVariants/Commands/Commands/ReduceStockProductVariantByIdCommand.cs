using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.ProductVariants;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;

public class ReduceStockProductVariantByIdCommand(VariantStockDto variantStock) : IRequest<BaseResponse>
{
    public VariantStockDto VariantStock { get; } = variantStock;
}