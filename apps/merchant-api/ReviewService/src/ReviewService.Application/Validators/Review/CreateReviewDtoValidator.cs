using FluentValidation;
using Microsoft.Extensions.Options;
using ReviewService.Application.Dtos.Review;

namespace ReviewService.Application.Validators.Review;

public class CreateReviewDtoValidator : AbstractValidator<CreateReviewDto>
{
    public CreateReviewDtoValidator(IOptions<ValidationSettings.ValidationSettings> validationSettings)
    {
        var reviewSettings = validationSettings.Value.Review;
        RuleFor(r => r.ClientId).NotNull();
        RuleFor(r => r.ClientName)
            .NotNull()
            .MinimumLength(reviewSettings.MinLengthName)
            .MaximumLength(reviewSettings.MaxLengthName);
        RuleFor(r => r.Comment)
            .MaximumLength(reviewSettings.MaxLengthComment);
        RuleFor(r => r.Rating)
            .NotNull()
            .Must(r => r <= reviewSettings.MaxRatingRange).WithMessage($"The rating should be smaller than {reviewSettings.MaxRatingRange}")
            .Must(r => r >= reviewSettings.MinRatingRange).WithMessage($"The rating should be bigger than {reviewSettings.MinRatingRange}");
    }
}
