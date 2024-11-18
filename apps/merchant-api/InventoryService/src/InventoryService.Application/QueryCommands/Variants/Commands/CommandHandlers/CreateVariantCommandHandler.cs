using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.Dtos.Variants;
using InventoryService.Application.QueryCommands.Variants.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.CommandHandlers;

public class CreateVariantCommandHandler(
    IValidator<CreateVariantDto> validator,
    IRepository<Variant> variantRepository, 
    IResponseHandlingHelper responseHandlingHelper) 
    : IRequestHandler<CreateVariantCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(
        CreateVariantCommand request, 
        CancellationToken cancellationToken)
    {
        var variantDto = request.Variant;
        var response = await validator.ValidateAsync(variantDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<CreateProductVariantDto>(
            "The operation to create a variant was not completed, please check the errors.", 
            response.Errors.Select(e => e.ErrorMessage).ToList());

        var variant = new Variant
        {
            Name = char.ToUpper(request.Variant.Name[0]) + request.Variant.Name[1..].ToLower()
        };
        
        variant  = await variantRepository.AddAsync(variant);;
        return responseHandlingHelper.Created("The variant was added successfully.", variant.Id);
    }
}