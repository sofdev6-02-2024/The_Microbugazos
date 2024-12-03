using FluentValidation;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.ValidatorSettings;
using Microsoft.Extensions.Options;

namespace InventoryService.Application.Validators.ProductVariants;

public class UpdateProductVariantValidator : AbstractValidator<UpdateProductVariantDto>
{
    public UpdateProductVariantValidator(IOptions<ValidationSettings> validationSettings)
    {
        var productVariantSettings = validationSettings.Value.ProductVariant;
        
        RuleFor(pv => pv.Id)
            .NotNull().WithMessage("Product Variant ID cannot be null.")
            .NotEmpty().WithMessage("Product Variant ID is required.");
    
    }
}