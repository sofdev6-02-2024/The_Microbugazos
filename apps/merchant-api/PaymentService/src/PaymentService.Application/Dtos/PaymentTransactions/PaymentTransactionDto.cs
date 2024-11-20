namespace PaymentService.Application.Dtos.PaymentTransactions;

public class PaymentTransactionDto
{
    public Guid PaymentTransactionId { get; set; }
    public Guid OrderId { get; set; }
    public double Amount { get; set; }
    public string TransactionOrderStatus { get; set; } = string.Empty;
    public PaymentMethodDto PaymentMethod { get; set; }
}