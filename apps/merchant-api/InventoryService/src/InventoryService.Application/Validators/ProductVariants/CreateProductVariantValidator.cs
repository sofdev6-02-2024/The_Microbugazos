using FluentValidation;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.ValidatorSettings;
using Microsoft.Extensions.Options;

namespace InventoryService.Application.Validators.ProductVariants;

public class CreateProductVariantValidator : AbstractValidator<CreateProductVariantDto>
{
    public CreateProductVariantValidator(IOptions<ValidationSettings> validationSettings)
    {
        var productVariantSettings = validationSettings.Value.ProductVariant;
        
        RuleFor(pv => pv.ProductId)
            .NotNull().WithMessage("Product ID cannot be null.")
            .NotEmpty().WithMessage("Product ID is required.");
        
        RuleFor(pv => pv.Image)
            .SetValidator(new ProductVariantImageDtoValidator(validationSettings)) 
            .When(x => x.Image != null);

        RuleFor(x => x.PriceAdjustment)
            .NotNull().WithMessage("Price Adjustment cannot be null.")
            .GreaterThan(productVariantSettings.PriceAdjustmentMin)
            .WithMessage($"The Price Adjustment must be greater than {productVariantSettings.PriceAdjustmentMin}.");

        RuleFor(x => x.StockQuantity)
            .NotNull().WithMessage("Stock Quantity cannot be null.")
            .GreaterThan(productVariantSettings.StockQuantityMin)
            .WithMessage($"The Stock Quantity must be greater than {productVariantSettings.StockQuantityMin}.");

        RuleFor(x => x.Attributes)
            .NotNull().WithMessage("Attributes is required")
            .Must(o => o is { Count: >= 1 }).WithMessage("Product Variant must have at least one attribute.");  
        
        RuleForEach(x => x.Attributes)
            .SetValidator(new ProductVariantAttributeDtoValidator(validationSettings))
            .When(x => x.Attributes.Count != 0);
    }
}