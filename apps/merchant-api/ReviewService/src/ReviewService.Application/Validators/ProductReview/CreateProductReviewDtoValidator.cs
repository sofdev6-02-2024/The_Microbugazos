using FluentValidation;
using Microsoft.Extensions.Options;
using ReviewService.Application.Dtos.ProductReview;
using ReviewService.Application.Validators.Review;

namespace ReviewService.Application.Validators.ProductReview;

public class CreateProductReviewDtoValidator : AbstractValidator<CreateProductReviewDto>
{
    public CreateProductReviewDtoValidator(IOptions<ValidationSettings.ValidationSettings> validationSettings)
    {
        RuleFor(e => e.ProductId).NotNull();
        RuleForEach(e => e.Reviews)
            .SetValidator(new CreateReviewDtoValidator(validationSettings));
    }
}