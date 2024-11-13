using FluentValidation;
using UserService.Application.Dtos.Stores;

namespace UserService.Application.Validators;
public class StoreDtoValidator : AbstractValidator<StoreDto>
{
    public StoreDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(30)
            .WithMessage("Name cannot be more than 30 characters.")
            .MinimumLength(2)
            .WithMessage("Name must be at least 2 characters.")
            .Matches("^[a-zA-Z0-9 ]*$")
            .WithMessage("Name can only contain letters, numbers, and spaces.");

        RuleFor(x => x.Description)
            .NotEmpty()
            .WithMessage("Description is required.")
            .MaximumLength(300)
            .WithMessage("Description cannot be more than 300 characters.")
            .MinimumLength(10)
            .WithMessage("Description must be at least 10 characters.")
            .Must(description => !string.IsNullOrWhiteSpace(description))
            .WithMessage("Description cannot contain only whitespace.");

        RuleFor(x => x.Address)
            .NotEmpty()
            .WithMessage("Address is required.")
            .MaximumLength(60)
            .WithMessage("Address cannot be more than 60 characters.")
            .MinimumLength(8)
            .WithMessage("Address must be at least 8 characters.")
            .Matches("^[a-zA-Z0-9., -]+$")
            .WithMessage("Address can only contain letters, numbers, spaces, commas, periods, and hyphens.");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .WithMessage("Phone number is required.")
            .MaximumLength(30)
            .WithMessage("Phone number cannot be more than 30 characters.")
            .MinimumLength(3)
            .WithMessage("Phone number must be at least 3 characters.")
            .Matches(@"^\+?[0-9\s-]*$")
            .WithMessage("Phone number can only contain digits, spaces, and hyphens.");
    }
}
