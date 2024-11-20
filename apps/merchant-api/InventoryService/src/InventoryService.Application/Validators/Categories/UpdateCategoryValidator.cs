using FluentValidation;
using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.ValidatorSettings;
using Microsoft.Extensions.Options;

namespace InventoryService.Application.Validators.Categories;

public class UpdateCategoryValidator : AbstractValidator<UpdateCategoryDto>
{
    public UpdateCategoryValidator(IOptions<ValidationSettings> validationSettings)
    {
        var categorySettings = validationSettings.Value.Category;
        
        RuleFor(x => x.Id)
            .NotNull().WithMessage("Category ID cannot be null.")
            .NotEmpty().WithMessage("Category ID is required.");
        
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .Length(categorySettings.CategoryNameMinLength, categorySettings.CategoryNameMaxLength)
            .WithMessage($"Name must be between {categorySettings.CategoryNameMinLength} and {categorySettings.CategoryNameMaxLength} characters.")
            .When(x => x.Name != null); 

        RuleFor(x => x.IsActive)
            .Must(isActive => isActive is true or false)
            .WithMessage("IsActive must be either true or false.")
            .When(x => x.IsActive != null); 
    }
}