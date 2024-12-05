using FluentValidation;
using InventoryService.Application.Dtos.Reservations;
using InventoryService.Application.ValidatorSettings;
using Microsoft.Extensions.Options;

namespace InventoryService.Application.Validators.Reservations;

public class CreateReservationValidator : AbstractValidator<CreateReservationDto>
{
    public CreateReservationValidator()
    {
        RuleFor(c => c.ClientId).NotEmpty().WithMessage("The client id is required");
        RuleFor(c => c.Products).NotNull().WithMessage("The products is required").Must(c => c is { Count: >= 1 }).WithMessage("The products is required");
    }
}