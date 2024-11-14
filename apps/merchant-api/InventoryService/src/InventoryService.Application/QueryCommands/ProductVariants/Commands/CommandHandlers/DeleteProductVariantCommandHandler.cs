using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.CommandHandlers;

public class DeleteProductVariantCommandHandler(
    IRepository<ProductVariant> productVariantRepository, 
    IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<DeleteProductVariantCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(DeleteProductVariantCommand request, CancellationToken cancellationToken)
    {
        var productVariant = await productVariantRepository.GetByIdAsync(request.Id);
        if (productVariant == null) return responseHandlingHelper.NotFound<ProductVariant>($"The product variant with the follow id '{request.Id}' was not found.");

        var response = await productVariantRepository.DeleteAsync(request.Id);
        return responseHandlingHelper.Ok("The product variant has been successfully deleted.", response);
    }
}