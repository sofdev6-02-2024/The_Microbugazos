using FluentValidation;
using Microsoft.Extensions.Options;
using UserService.Application.Dtos.Stores;
using UserService.Application.ValidatorSettings;

namespace UserService.Application.Validators.Stores;
public class StoreDtoValidator : AbstractValidator<StoreDto>
{
    public StoreDtoValidator(IOptions<ValidationSettings> validationSettings)
    {
        var storeSettings = validationSettings.Value.Store;

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .Length(storeSettings.NameMinLength, storeSettings.NameMaxLength)
            .WithMessage($"Name must be between {storeSettings.NameMinLength} and {storeSettings.NameMaxLength} characters.")
            .Matches(storeSettings.NameRegex)
            .WithMessage("Name can only contain letters, numbers, and spaces.");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.")
            .Length(storeSettings.DescriptionMinLength, storeSettings.DescriptionMaxLength)
            .WithMessage($"Description must be between {storeSettings.DescriptionMinLength} and {storeSettings.DescriptionMaxLength} characters.");

        RuleFor(x => x.Address)
            .NotEmpty().WithMessage("Address is required.")
            .Length(storeSettings.AddressMinLength, storeSettings.AddressMaxLength)
            .WithMessage($"Address must be between {storeSettings.AddressMinLength} and {storeSettings.AddressMaxLength} characters.")
            .Matches(storeSettings.AddressRegex)
            .WithMessage("Address can only contain letters, numbers, spaces, commas, periods, and hyphens.");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Phone number is required.")
            .Length(storeSettings.PhoneNumberMinLength, storeSettings.PhoneNumberMaxLength)
            .WithMessage($"Phone number must be between {storeSettings.PhoneNumberMinLength} and {storeSettings.PhoneNumberMaxLength} characters.")
            .Matches(storeSettings.PhoneNumberRegex)
            .WithMessage("Phone number can only contain digits, spaces, and hyphens.");
    }
}
