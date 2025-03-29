using Backend.Application.Dtos.Users;
using Backend.Application.ValidatorSettings;
using FluentValidation;
using Microsoft.Extensions.Options;

namespace Backend.Application.Validators.Users;

public class UpdateUserDtoValidator : AbstractValidator<UpdateUserDto>
{
    public UpdateUserDtoValidator(IOptions<ValidationSettings> validationSettings)
    {
        var userSettings = validationSettings.Value.User;
        
        RuleFor(u => u.Name)
            .Length(userSettings.UserNameMinLength, userSettings.UserNameMaxLength)
            .WithMessage($"Name must be between {userSettings.UserNameMinLength} and {userSettings.UserNameMaxLength}.");
        RuleFor(u => u.Email)
            .Matches(userSettings.EmailRegex).WithMessage("Email must be a valid email address.");
    }
}