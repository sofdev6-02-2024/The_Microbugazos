using FluentValidation;
using InventoryService.Application.Dtos.Variants;
using InventoryService.Application.ValidatorSettings;
using Microsoft.Extensions.Options;

namespace InventoryService.Application.Validators.Variants;

public class UpdateVariantValidator : AbstractValidator<UpdateVariantDto>
{
    public UpdateVariantValidator(IOptions<ValidationSettings> validationSettings)
    {
        var variantSettings = validationSettings.Value.Variant;
        
        RuleFor(x => x.Id)
            .NotNull().WithMessage("Category ID cannot be null.")
            .NotEmpty().WithMessage("Category ID is required.");
        
        RuleFor(c => c.Name)
            .NotEmpty().WithMessage("Name is required.")
            .Length(variantSettings.VariantNameMinLength, variantSettings.VariantNameMaxLength)
            .WithMessage($"Name must be between {variantSettings.VariantNameMinLength} and {variantSettings.VariantNameMaxLength} characters.")
            .When(x => x.Name != null); 
         
        RuleFor(x => x.IsActive)
            .Must(isActive => isActive is true or false)
            .WithMessage("IsActive must be either true or false.")
            .When(x => x.IsActive != null); 
    }
}