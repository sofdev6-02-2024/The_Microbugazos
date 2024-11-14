using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Variants;
using InventoryService.Application.QueryCommands.Variants.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Queries.QueryHandlers;

public class GetVariantByIdQueryHandler(IRepository<Variant> variantRepository, IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<GetVariantByIdQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetVariantByIdQuery request, CancellationToken cancellationToken)
    {
        var variant = await variantRepository.GetByIdAsync(request.Id);
        if (variant == null)
            return responseHandlingHelper.NotFound<VariantDto>("The variant with the follow id " + request.Id + " was not found");
        
        return responseHandlingHelper.Ok("The category has been successfully obtained.",  new VariantDto
        {
            Id = variant!.Id, 
            Name = variant.Name, 
            IsActive = variant.IsActive, 
            values = variant.ProductAttributes.Select(attribute => new ValueDto { Id = attribute.Id, Name = attribute.Value }).ToList()
        });
    }
}