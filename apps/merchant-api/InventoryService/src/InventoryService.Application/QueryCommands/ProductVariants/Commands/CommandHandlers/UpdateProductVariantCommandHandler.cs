using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.CommandHandlers;

public class UpdateProductVariantCommandHandler(
    IRepository<ProductVariant> productVariantRepository,
    IRepository<ProductAttribute> productAttributeRepository,
    IRepository<Image> imageRepository,
    IRepository<Variant> variantRepository)
    : IRequestHandler<UpdateProductVariantCommand, ProductVariantDto>
{
    public async Task<ProductVariantDto> Handle(UpdateProductVariantCommand request,
        CancellationToken cancellationToken)
    {
        var updateDto = request.ProductVariant;
        var existingProductVariant = await productVariantRepository.GetByIdAsync(updateDto.ProductVariantId);
        if (existingProductVariant == null)
            throw new KeyNotFoundException($"Product variant with ID {updateDto.ProductVariantId} not found.");

        Image? image = null;
        if (updateDto.Image != null)
        {
            existingProductVariant.Image ??= new Image();
            existingProductVariant.Image.Url = updateDto.Image.Url;
            existingProductVariant.Image.AltText = updateDto.Image.AltText;
            await imageRepository.UpdateAsync(existingProductVariant.Image);
        }

        existingProductVariant.Image = image ?? existingProductVariant.Image;
        existingProductVariant.PriceAdjustment = updateDto.PriceAdjustment ?? existingProductVariant.PriceAdjustment;
        existingProductVariant.StockQuantity = updateDto.StockQuantity ?? existingProductVariant.StockQuantity;
        var variantImageDto = new ProductVariantImageDto
            { AltText = existingProductVariant.Image?.AltText!, Url = existingProductVariant.Image?.Url! };

        if (request.ProductVariant.Attributes != null)
        {
            foreach (var attribute in existingProductVariant.Attributes)
                await productAttributeRepository.DeleteAsync(attribute.Id);
            foreach (var attributeDto in request.ProductVariant.Attributes)
            {
                var variant = await variantRepository.AddAsync(new Variant { Name = attributeDto.Name });
                var productAttribute = new ProductAttribute
                {
                    ProductVariant = existingProductVariant,
                    Variant = variant,
                    Value = attributeDto.Value
                };
                await productAttributeRepository.AddAsync(productAttribute);
            }
        }

        await productVariantRepository.UpdateAsync(existingProductVariant);

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