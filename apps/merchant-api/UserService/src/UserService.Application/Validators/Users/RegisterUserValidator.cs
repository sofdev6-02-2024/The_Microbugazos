using FluentValidation;
using Microsoft.Extensions.Options;
using UserService.Application.Dtos.Users;
using UserService.Application.ValidatorSettings;

namespace UserService.Application.Validators.Users;

public class RegisterUserValidator : AbstractValidator<RegisterUserDto>
{
    public RegisterUserValidator(IOptions<ValidationSettings> validationSettings)
    {
        var userSettings = validationSettings.Value.User;
        
        RuleFor(u => u.Name)
            .NotEmpty().WithMessage("Name is required.")
            .NotNull().WithMessage("Name cannot be null.")
            .Length(userSettings.UserNameMinLength, userSettings.UserNameMaxLength)
            .WithMessage($"Name must be between {userSettings.UserNameMinLength} and {userSettings.UserNameMaxLength}.");
        RuleFor(u => u.Email)
            .NotEmpty().WithMessage("Email is required.")
            .NotNull().WithMessage("Email cannot be null.")
            .Matches(userSettings.EmailRegex).WithMessage("Email must be a valid email address.");
    }
}