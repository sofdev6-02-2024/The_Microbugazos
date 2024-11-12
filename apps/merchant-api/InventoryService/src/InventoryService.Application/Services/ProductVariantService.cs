using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;

namespace InventoryService.Application.Services;

public class ProductVariantService(
    IRepository<ProductVariant> productVariantRepository,
    IRepository<Variant> variantRepository,
    IRepository<ProductAttribute> productAttributeRepository,
    IRepository<Image> imageRepository)
{
    public async Task<ProductVariant> CreateProductVariant(CreateProductVariantDto productVariantDto, Guid productId)
    {
        Image? image = null;
        if (productVariantDto.Image != null)
        {
            image = await imageRepository.AddAsync(new Image
            {
                Url = productVariantDto.Image.Url,
                AltText = productVariantDto.Image.AltText
            });
        }

        var productVariant = new ProductVariant
        {
            Image = image,
            ProductId = productId,
            PriceAdjustment = productVariantDto.PriceAdjustment,
            StockQuantity = productVariantDto.StockQuantity,
            Attributes = new List<ProductAttribute>()
        };

        foreach (var attribute in productVariantDto.Attributes)
        {
            var variant = await variantRepository.AddAsync(new Variant { Name = attribute.Name });
            var productAttribute = new ProductAttribute
            {
                ProductVariant = productVariant,
                Variant = variant,
                Value = attribute.Value
            };
            productVariant.Attributes.Add(productAttribute);
        }
        var productVariantCreated = await productVariantRepository.AddAsync(productVariant);
        return productVariantCreated;
    }

    public async Task<ProductVariantDto> UpdateProductVariant(UpdateProductVariantDto updateDto, ProductVariant existingProductVariant)
    {
        if (updateDto.Image != null)
        {
            existingProductVariant.Image ??= new Image();
            existingProductVariant.Image.Url = updateDto.Image.Url;
            existingProductVariant.Image.AltText = updateDto.Image.AltText;
            await imageRepository.UpdateAsync(existingProductVariant.Image);
        }
        
        existingProductVariant.PriceAdjustment = updateDto.PriceAdjustment ?? existingProductVariant.PriceAdjustment;
        existingProductVariant.StockQuantity = updateDto.StockQuantity ?? existingProductVariant.StockQuantity;

        if (updateDto.Attributes != null)
        {
            foreach (var attribute in existingProductVariant.Attributes)
                await productAttributeRepository.DeleteAsync(attribute.Id);

            foreach (var attributeDto in updateDto.Attributes)
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

        var variantImageDto = new ProductVariantImageDto
        {
            AltText = existingProductVariant.Image?.AltText!,
            Url = existingProductVariant.Image?.Url!
        };

        return new ProductVariantDto
        {
            ProductVariantId = existingProductVariant.Id,
            ProductVariantImage = variantImageDto,
            ProductId = existingProductVariant.ProductId,
            PriceAdjustment = existingProductVariant.PriceAdjustment,
            StockQuantity = existingProductVariant.StockQuantity,
            Attributes = existingProductVariant.Attributes.Select(attr => new GetProductVariantAttributeDto
            {
                ProductVariantAttributeId = attr.Id,
                Name = attr.Variant.Name,
                Value = attr.Value
            }).ToList()
        };
    }
}
