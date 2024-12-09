using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.QueryCommands.Products.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Commands.CommandHandlers;

public class UpdateProducrThresholdCommandHandler(IProductRepository productRepository, IResponseHandlingHelper responseHandlingHelper) : IRequestHandler<UpdateProducrThresholdCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(UpdateProducrThresholdCommand request, CancellationToken cancellationToken)
    {
        Product? product = await productRepository.GetByIdAsync(request.ProductId);
        if (product == null) return responseHandlingHelper.NotFound<Product>("The product with the follow id " + request.ProductId + " was not found");

        product.LowStockThreshold = request.Threshold;
        await productRepository.UpdateAsync(product);
        return responseHandlingHelper.Ok("The product threshold has been successfully updated.", true);
    }
}
