using InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;
using InventoryService.Application.Services;
using InventoryService.Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.CommandHandlers;

public class UpdateProductVariantCommandHandler(
    IRepository<ProductVariant> productVariantRepository,
    ProductVariantService productVariantService, 
    IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<UpdateProductVariantCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(UpdateProductVariantCommand request,
        CancellationToken cancellationToken)
    {
        var updateDto = request.ProductVariant;
        var existingProductVariant = await productVariantRepository.GetByIdAsync(updateDto.ProductVariantId);
        if (existingProductVariant == null) return responseHandlingHelper.NotFound<ProductVariant>(
            $"The product variant with the follow id '{updateDto.ProductVariantId}' was not found.");
        
        var productVariantToDisplay = await productVariantService.UpdateProductVariant(updateDto, existingProductVariant);
        return responseHandlingHelper.Ok("The product variant has been successfully updated.", productVariantToDisplay);
    }
}