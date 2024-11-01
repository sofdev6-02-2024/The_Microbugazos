using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.ProductVariants.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Queries.QueryHandlers;

public class GetProductsVariantsBySpecificProductQueryHandler(IRepository<ProductVariant> productVariantRepository) :
    IRequestHandler<GetProductsVariantsBySpecificProductQuery, PaginatedResponseDto<ProductVariantDto>>
{
    public async Task<PaginatedResponseDto<ProductVariantDto>> Handle(GetProductsVariantsBySpecificProductQuery request,
        CancellationToken cancellationToken)
    {
        var totalProductVariants = await productVariantRepository.GetAllAsync(request.Page, request.PageSize);
        foreach (var p in totalProductVariants.ToList())
        {
            Console.WriteLine("\n\n\n a  = " + p.ProductId + " b = " + request.IdProduct);
            Console.WriteLine(p.ProductId == request.IdProduct);
        }
        var totalProductVariantDto = totalProductVariants
            .Where(existingProductVariant => existingProductVariant.ProductId == request.IdProduct)
            .Select(existingProductVariant => new ProductVariantDto
            {
                ProductVariantId = existingProductVariant.Id,
                ProductVariantImage = new ProductVariantImageDto
                {
                    AltText = existingProductVariant.Image?.AltText!,
                    Url = existingProductVariant.Image?.Url!
                },
                ProductId = existingProductVariant.ProductId,
                PriceAdjustment = existingProductVariant.PriceAdjustment,
                StockQuantity = existingProductVariant.StockQuantity,
                Attributes = existingProductVariant.Attributes.Select(a => new ProductVariantAttributeDto
                {
                    Name = a.Variant.Name,
                    Value = a.Value
                }).ToList()
            }).ToList();
        return new PaginatedResponseDto<ProductVariantDto>
        {
            Items = totalProductVariantDto,
            TotalCount = totalProductVariantDto.Count,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }
}