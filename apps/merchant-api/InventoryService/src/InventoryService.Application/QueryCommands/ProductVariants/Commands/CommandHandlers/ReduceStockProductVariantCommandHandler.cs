using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;
using InventoryService.Application.Services;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.CommandHandlers;

public class ReduceStockProductVariantCommandHandler(
    IValidator<UpdateProductVariantDto> validator,
    IRepository<ProductVariant> repository,
    ProductVariantService service,
    IResponseHandlingHelper responseHandlingHelper) : IRequestHandler<ReduceStockProductVariantCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(ReduceStockProductVariantCommand request, CancellationToken cancellationToken)
    {
        var reduceDto = request.ReduceStockProductVariant;

        if (reduceDto.VariantsStock.Length == 0)
        {
            return responseHandlingHelper.BadRequest<ReduceStockProductVariantDto>(
                "No product variants were provided for stock reduction.");
        }

        List<ProductVariantDto> updatedVariants = new List<ProductVariantDto>();

        foreach (var variantStock in reduceDto.VariantsStock)
        {
            var variant = await repository.GetByIdAsync(variantStock.VariantId);
            if (variant is null) return responseHandlingHelper.NotFound<ReduceStockProductVariantDto>(
                    $"The product variant with the following ID '{variantStock.VariantId}' was not found.");

            if (variant.StockQuantity < variantStock.Quantity) return responseHandlingHelper.BadRequest<ReduceStockProductVariantDto>(
                    $"Insufficient stock for the product variant with ID '{variantStock.VariantId}'.");

            var updateDto = new UpdateProductVariantDto
            {
                Id = variantStock.VariantId,
                StockQuantity = variant.StockQuantity - variantStock.Quantity
            };

            var response = await validator.ValidateAsync(updateDto, cancellationToken);
            if (!response.IsValid) return responseHandlingHelper.BadRequest<UpdateProductVariantDto>(
                    "The operation to update the product variant was not completed, please check the errors.",
                    response.Errors.Select(error => error.ErrorMessage).ToList());

            var productVariantToDisplay = await service.UpdateProductVariant(updateDto, variant);

            updatedVariants.Add(productVariantToDisplay);
        }

        return responseHandlingHelper.Ok<List<ProductVariantDto>>(
            "The stock quantity for variants has been successfully reduced.", updatedVariants);
    }
}

