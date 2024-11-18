using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.Variants;
using InventoryService.Application.QueryCommands.Variants.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.CommandHandlers;

public class UpdateVariantCommandHandler(
    IValidator<UpdateVariantDto> validator,
    IRepository<Variant> variantRepository, 
    IResponseHandlingHelper responseHandlingHelper) : IRequestHandler<UpdateVariantCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(UpdateVariantCommand request, CancellationToken cancellationToken)
    {
        var variantDto = request.Variant;
        var variantToUpdate = await variantRepository.GetByIdAsync(variantDto.Id);
        if (variantToUpdate == null) return responseHandlingHelper.NotFound<Category>(
            $"The category with the follow id '{variantDto.Id}' was not found.");

        var response = await validator.ValidateAsync(variantDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<UpdateVariantDto>(
            "The operation to update the variant was not completed, please check the errors.", 
            response.Errors.Select(e => e.ErrorMessage).ToList());
        
        variantToUpdate.Name = variantDto.Name ?? variantToUpdate.Name;
        variantToUpdate.IsActive = variantDto.IsActive ?? variantToUpdate.IsActive;

        await variantRepository.UpdateAsync(variantToUpdate);
        var variantToDisplay = new VariantDto
        {
            Id = variantToUpdate.Id,
            Name = variantToUpdate.Name,
            IsActive = variantToUpdate.IsActive,
            values = variantToUpdate.ProductAttributes.Select(attribute => new ValueDto
            {
                Id = attribute.Id,
                Name = attribute.Value
            }).ToList()
        };
        
        return responseHandlingHelper.Ok("The variant has been successfully updated.", variantToDisplay);
    }
}