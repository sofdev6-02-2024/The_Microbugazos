using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.ProductVariants.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Queries.QueryHandlers;

public class GetProductVariantByIdQueryHandler(IRepository<ProductVariant> productVariantRepository)
    : IRequestHandler<GetProductVariantByIdQuery, ProductVariantDto?>
{
    public async Task<ProductVariantDto?> Handle(GetProductVariantByIdQuery request, CancellationToken cancellationToken)
    {
        var existingProductVariant = await productVariantRepository.GetByIdAsync(request.Id);
        if (existingProductVariant == null)
            throw new KeyNotFoundException($"Product variant with ID {request.Id} not found."); 
        
        var variantImageDto = new ProductVariantImageDto { AltText = existingProductVariant.Image?.AltText!, Url = existingProductVariant.Image?.Url! };
        return new ProductVariantDto
        {
            ProductVariantId = existingProductVariant.Id,
            ProductVariantImage = variantImageDto,
            ProductId = existingProductVariant.ProductId,
            PriceAdjustment = existingProductVariant.PriceAdjustment,
            StockQuantity = existingProductVariant.StockQuantity,
            Attributes = existingProductVariant.Attributes.Select(currentProductAttribute => new GetProductVariantAttributeDto
            {
                ProductVariantAttributeId = currentProductAttribute.Id,
                Name = currentProductAttribute.Variant.Name,
                Value = currentProductAttribute.Value
            }).ToList()
        };
    }
}