namespace PaymentService.Application.Dtos.PaymentTransactions;

public class PaymentMethodDto
{
    public Guid PaymentMethodId { get; set; }
    public string Name { get; set; } = string.Empty;
}