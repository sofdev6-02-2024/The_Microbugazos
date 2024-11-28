using FluentValidation;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.ValidatorSettings;
using Microsoft.Extensions.Options;

namespace InventoryService.Application.Validators.Images;

public class UpdateImageValidator : AbstractValidator<UpdateImageDto>
{
    public UpdateImageValidator(IOptions<ValidationSettings> validationSettings)
    {
        var imageSettings = validationSettings.Value.Image;
        
        RuleFor(i => i.Id)
            .NotNull().WithMessage("Image ID cannot be null.")
            .NotEmpty().WithMessage("Image ID is required.");
        
        RuleFor(i => i.AltText)
            .NotEmpty().WithMessage("Alt Text is required.")
            .NotNull().WithMessage("Alt Text cannot be null.")
            .Length(imageSettings.AltTextMinLength, imageSettings.AltTextMaxLength)
            .WithMessage($"Alt Text must be between {imageSettings.AltTextMinLength} and {imageSettings.AltTextMaxLength} characters.");
        
        RuleFor(i => i.Url)
            .NotEmpty().WithMessage("Url is required.")
            .NotNull().WithMessage("Url cannot be null.")
            .Length(imageSettings.UrlMinLength, imageSettings.UrlMaxLength)
            .WithMessage($"Url must be between {imageSettings.UrlMinLength} and {imageSettings.UrlMaxLength} characters.")
            .Must(CustomValidators.BeAValidUrl).WithMessage("Url is not a valid URL.");
    }
}