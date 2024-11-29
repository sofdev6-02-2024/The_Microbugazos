using FluentValidation;
using UserService.Application.Dtos.ContactUsMessages;

namespace UserService.Application.Validators.ContactUsMessages;

public class CreateContactUsMessageValidator : AbstractValidator<CreateContactUsMessageDto>
{
    public CreateContactUsMessageValidator()
    {
        RuleFor(c => c.Name)
            .NotEmpty().WithMessage("Name is required.")
            .NotNull().WithMessage("Name cannot be null.")
            .Length(5, 100)
            .WithMessage($"Name must be between 3 and 100 characters.");

        RuleFor(c => c.Email)
            .NotEmpty().WithMessage("Email is required.")
            .NotNull().WithMessage("Email cannot be null.")
            .EmailAddress().WithMessage("Invalid email format.");

        RuleFor(c => c.Message)
            .NotEmpty().WithMessage("Message is required.")
            .NotNull().WithMessage("Message cannot be null.")
            .Length(10, 500).WithMessage("Message must be between 10 and 500 characters.");
    }
}