using FluentValidation;
using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.ValidatorSettings;
using Microsoft.Extensions.Options;

namespace InventoryService.Application.Validators.Categories;

public class CreateCategoryValidator : AbstractValidator<CreateCategoryDto>
{
    public CreateCategoryValidator(IOptions<ValidationSettings> validationSettings)
    {
        var categorySettings = validationSettings.Value.Category;
        
        RuleFor(c => c.Name)
            .NotEmpty().WithMessage("Name is required.")
            .NotNull().WithMessage("Name cannot be null.")
            .Length(categorySettings.CategoryNameMinLength, categorySettings.CategoryNameMaxLength)
            .WithMessage($"Name must be between {categorySettings.CategoryNameMinLength} and {categorySettings.CategoryNameMaxLength} characters.");
    }
}