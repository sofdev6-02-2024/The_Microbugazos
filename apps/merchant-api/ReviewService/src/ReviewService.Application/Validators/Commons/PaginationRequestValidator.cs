using FluentValidation;
using ReviewService.Application.CommandsQueries.Commons;

namespace ReviewService.Application.Validators.Commons;

public class PaginationRequestValidator : AbstractValidator<PaginationRequest>
{
    public PaginationRequestValidator()
    {
        RuleFor(e => e.Page)
            .NotNull()
            .Must(p => p >= 0).WithMessage("Page should be greater than zero");
        RuleFor(e => e.PageSize)
            .NotNull()
            .Must(p => p >= 0).WithMessage("Page should be greater than zero");
    }
}