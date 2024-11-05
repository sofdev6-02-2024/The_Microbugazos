using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;
using InventoryService.Application.Services;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.ProductVariants.Commands.CommandHandlers;

public class UpdateProductVariantCommandHandler(
    IRepository<ProductVariant> productVariantRepository,
    ProductVariantService productVariantService)
    : IRequestHandler<UpdateProductVariantCommand, ProductVariantDto>
{
    public async Task<ProductVariantDto> Handle(UpdateProductVariantCommand request,
        CancellationToken cancellationToken)
    {
        var updateDto = request.ProductVariant;
        var existingProductVariant = await productVariantRepository.GetByIdAsync(updateDto.ProductVariantId);
        if (existingProductVariant == null)
            throw new KeyNotFoundException($"Product variant with ID {updateDto.ProductVariantId} not found.");
        
        return await productVariantService.UpdateProductVariant(updateDto, existingProductVariant);
    }
}