using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;
using InventoryService.Application.Services;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.CommandHandlers;

public class CreateProductVariantCommandHandler(
    IRepository<Product> productRepository,
    ProductVariantService productVariantService)
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

        var productVariant = await productVariantService.CreateProductVariant(productVariantDto, product.Id);
        return new ProductVariantDto { ProductVariantId = productVariant.Id, 
            ProductId = product.Id, Attributes = productAttributes };
    }
}