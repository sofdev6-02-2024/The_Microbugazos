using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.Variants;
using InventoryService.Application.QueryCommands.Images.Queries.Queries;
using InventoryService.Application.QueryCommands.Variants.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Queries.QueryHandlers;

public class GetVariantByIdQueryHandler(IRepository<Variant> variantRepository)
    : IRequestHandler<GetVariantByIdQuery, VariantDto?>
{
    public async Task<VariantDto?> Handle(GetVariantByIdQuery request, CancellationToken cancellationToken)
    {
        var variant = await variantRepository.GetByIdAsync(request.Id);
        return new VariantDto
        {
            Id = variant!.Id, 
            Name = variant.Name, 
            IsActive = variant.IsActive, 
            values = variant.ProductAttributes.Select(attribute => new ValueDto { Id = attribute.Id, Name = attribute.Value }).ToList()
        };
    }
}