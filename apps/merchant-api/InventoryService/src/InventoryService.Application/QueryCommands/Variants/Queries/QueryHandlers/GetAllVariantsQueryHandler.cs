using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Variants;
using InventoryService.Application.QueryCommands.Variants.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Queries.QueryHandlers;

public class GetAllVariantsQueryHandler(IRepository<Variant> variantRepository, IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<GetAllVariantsQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetAllVariantsQuery request, CancellationToken cancellationToken)
    {
        var totalVariants = await variantRepository.GetAllAsync();

        return responseHandlingHelper.Ok("Variants have been successfully obtained.", totalVariants.Select(
            variant => new VariantDto
            {
                Id = variant.Id, 
                Name = variant.Name, 
                IsActive = variant.IsActive, 
                values = variant.ProductAttributes.Select(attribute => new ValueDto { Id = attribute.Id, Name = attribute.Value }).ToList()
            }).ToList());
    }
}