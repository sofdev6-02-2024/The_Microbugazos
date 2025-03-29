using Backend.Application.Dtos.ContactUsMessages;
using Backend.Application.ValidatorSettings;
using FluentValidation;
using Microsoft.Extensions.Options;

namespace Backend.Application.Validators.ContactUsMessages;

public class CreateContactUsMessageValidator : AbstractValidator<CreateContactUsMessageDto>
{
    public CreateContactUsMessageValidator(IOptions<ValidationSettings> validationSettings)
    {
        var storeSettings = validationSettings.Value.ContactUs;

        RuleFor(c => c.Name)
            .NotEmpty().WithMessage("Name is required.")
            .NotNull().WithMessage("Name cannot be null.")
            .Length(storeSettings.NameMinLength, storeSettings.NameMaxLength)
            .WithMessage($"Name must be between 3 and 100 characters.");

        RuleFor(c => c.Email)
            .NotEmpty().WithMessage("Email is required.")
            .NotNull().WithMessage("Email cannot be null.")
            .EmailAddress().WithMessage("Invalid email format.");

        RuleFor(c => c.Message)
            .NotEmpty().WithMessage("Message is required.")
            .NotNull().WithMessage("Message cannot be null.")
            .Length(storeSettings.MessageMinLength, storeSettings.MessageMaxLength)
            .WithMessage("Message must be between 10 and 500 characters.");
    }
}