using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.CommandHandlers;

public class CreateProductVariantCommandHandler(
    IRepository<Product> productRepository,
    IRepository<Variant> variantRepository,
    IRepository<Image> imageRepository,
    IRepository<ProductVariant> productVariantRepository)
    : IRequestHandler<CreateProductVariantCommand, ProductVariantDto>
{
    public async Task<ProductVariantDto> Handle(CreateProductVariantCommand request,
        CancellationToken cancellationToken)
    {
        var productVariantDto = request.ProductVariant;
        var productAttributes = new List<GetProductVariantAttributeDto>();
        var product = await productRepository.GetByIdAsync(productVariantDto.ProductId);
        if (product == null)
            throw new KeyNotFoundException($"The product's id {productVariantDto.ProductId} doesn't exist.");

        Image? image = null;
        if (productVariantDto.Image != null)
            image = imageRepository.AddAsync(
                    new Image
                    {
                        ProductId = productVariantDto.ProductId, Url = productVariantDto.Image!.Url,
                        AltText = productVariantDto.Image.AltText
                    })
                .Result;


        var productVariant = new ProductVariant
        {
            Image = image,
            ProductId = productVariantDto.ProductId,
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
            productAttributes.Add(new GetProductVariantAttributeDto
            {
                ProductVariantAttributeId = productAttribute.Id, Name = productAttribute.Variant.Name, Value = productAttribute.Value
            });
        }

        var productVariantCreated = await productVariantRepository.AddAsync(productVariant);
        return new ProductVariantDto { ProductVariantId = productVariantCreated.Id, 
            ProductId = product.Id, Attributes = productAttributes };
    }
}