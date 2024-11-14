using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;
using InventoryService.Application.Services;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.CommandHandlers;

public class CreateProductVariantCommandHandler(
    IRepository<Product> productRepository,
    ProductVariantService productVariantService, 
    IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<CreateProductVariantCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(CreateProductVariantCommand request,
        CancellationToken cancellationToken)
    {
        var productVariantDto = request.ProductVariant;
        var product = await productRepository.GetByIdAsync(productVariantDto.ProductId);
        if (product == null)
            return responseHandlingHelper.NotFound<Product>("The product with the follow id " + productVariantDto.ProductId + " was not found");

        var productVariant = await productVariantService.CreateProductVariant(productVariantDto, product.Id);
        return responseHandlingHelper.Created("The product variant was added successfully.", productVariant.Id);
    }
}