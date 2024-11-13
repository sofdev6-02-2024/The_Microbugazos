using InventoryService.Application.Dtos.Variants;
using InventoryService.Application.QueryCommands.Variants.Commands.Commands;
using InventoryService.Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.CommandHandlers;

public class CreateVariantCommandHandler(
    IRepository<Variant> variantRepository, IResponseHandlingHelper responseHandlingHelper) 
    : IRequestHandler<CreateVariantCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(
        CreateVariantCommand request, 
        CancellationToken cancellationToken)
    {
        var variantDto = request.Variant;
        if (string.IsNullOrEmpty(variantDto.Name)) return responseHandlingHelper.BadRequest<VariantDto>("The field name is required.");

        var variant = new Variant
        {
            Name = char.ToUpper(request.Variant.Name[0]) + request.Variant.Name[1..].ToLower()
        };
        
        variant  = await variantRepository.AddAsync(variant);;
        return responseHandlingHelper.Created("The variant was added successfully.", variant.Id);
    }
}