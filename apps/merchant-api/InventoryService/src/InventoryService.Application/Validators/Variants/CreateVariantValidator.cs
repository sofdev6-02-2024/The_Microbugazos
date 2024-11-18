using FluentValidation;
using InventoryService.Application.Dtos.Variants;
using InventoryService.Application.ValidatorSettings;
using Microsoft.Extensions.Options;

namespace InventoryService.Application.Validators.Variants;

public class CreateVariantValidator : AbstractValidator<CreateVariantDto>
{
    public CreateVariantValidator(IOptions<ValidationSettings> validationSettings)
    {
        var variantSettings = validationSettings.Value.Variant;
        
        RuleFor(c => c.Name)
            .NotEmpty().WithMessage("Name is required.")
            .NotNull().WithMessage("Name cannot be null.")
            .Length(variantSettings.VariantNameMinLength, variantSettings.VariantNameMaxLength)
            .WithMessage($"Name must be between {variantSettings.VariantNameMinLength} and {variantSettings.VariantNameMaxLength} characters.");
    }
}