using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;
using InventoryService.Application.Services;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.CommandHandlers;

public class CreateProductVariantCommandHandler(
    IValidator<CreateProductVariantDto> validator,
    IRepository<Product> productRepository,
    ProductVariantService productVariantService, 
    IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<CreateProductVariantCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(CreateProductVariantCommand request,
        CancellationToken cancellationToken)
    {
        var productVariantDto = request.ProductVariant;
        var response = await validator.ValidateAsync(productVariantDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<CreateProductVariantDto>(
            "The operation to create a product variant was not completed, please check the errors.", 
            response.Errors.Select(e => e.ErrorMessage).ToList());
        
        var product = await productRepository.GetByIdAsync(productVariantDto.ProductId);
        if (product == null)
            return responseHandlingHelper.NotFound<Product>("The product with the follow id " + productVariantDto.ProductId + " was not found");

        var productVariant = await productVariantService.CreateProductVariant(productVariantDto, product.Id);
        return responseHandlingHelper.Created("The product variant was added successfully.", productVariant.Id);
    }
}