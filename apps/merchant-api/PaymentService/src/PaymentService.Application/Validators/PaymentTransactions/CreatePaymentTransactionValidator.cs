using FluentValidation;
using PaymentService.Application.Dtos.PaymentTransactions;
using PaymentService.Application.Services.Clients;

namespace PaymentService.Application.Validators.PaymentTransactions;

public class CreatePaymentTransactionValidator : AbstractValidator<CreatePaymentTransactionDto>
{
    public CreatePaymentTransactionValidator(ProductClientService productClientService)
    {
        RuleFor(paymentTransaction => paymentTransaction.OrderId)
            .NotNull().WithMessage("Order ID cannot be null.")
            .NotEmpty().WithMessage("Order ID is required.");
        
        RuleFor(paymentTransaction => paymentTransaction.PaymentMethodId)
            .NotNull().WithMessage("Payment Method ID cannot be null.")
            .NotEmpty().WithMessage("Payment Method ID is required.");

        RuleFor(paymentTransaction => paymentTransaction.Amount)
            .NotNull().WithMessage("Amount cannot be null.")
            .GreaterThan(0).WithMessage("Amount must be greater than 0.");
    }
}