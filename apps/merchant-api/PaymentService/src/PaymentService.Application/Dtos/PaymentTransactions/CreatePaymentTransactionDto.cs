using PaymentService.Domain.Entities.Enums;

namespace PaymentService.Application.Dtos.PaymentTransactions;

public class CreatePaymentTransactionDto
{
    public Guid OrderId { get; set; }
    public Guid PaymentMethodId { get; set; }
    public double Amount { get; set; }
    public PaymentStatus TransactionOrderStatus { get; set; } = PaymentStatus.Paid;
}