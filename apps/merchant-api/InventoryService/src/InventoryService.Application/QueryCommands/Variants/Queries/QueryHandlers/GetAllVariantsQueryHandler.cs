using AutoMapper;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.Variants;
using InventoryService.Application.QueryCommands.Images.Queries.Queries;
using InventoryService.Application.QueryCommands.Variants.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Queries.QueryHandlers;

public class GetAllVariantsQueryHandler(IRepository<Variant> variantRepository)
    : IRequestHandler<GetAllVariantsQuery, List<VariantDto>>
{
    public async Task<List<VariantDto>> Handle(GetAllVariantsQuery request, CancellationToken cancellationToken)
    {
        var totalVariants = await variantRepository.GetAllAsync();

        return totalVariants.Select(
            variant => new VariantDto
            {
                Id = variant.Id, 
                Name = variant.Name, 
                IsActive = variant.IsActive, 
                values = variant.ProductAttributes.Select(attribute => new ValueDto { Id = attribute.Id, Name = attribute.Value }).ToList()
            }).ToList();
    }
}