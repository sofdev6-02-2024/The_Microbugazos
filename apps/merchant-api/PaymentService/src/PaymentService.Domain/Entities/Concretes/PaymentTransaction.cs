using PaymentService.Domain.Entities.Bases;
using PaymentService.Domain.Entities.Enums;

namespace PaymentService.Domain.Entities.Concretes;

public class PaymentTransaction : BaseEntity
{
    public Guid OrderId { get; set; }
    public Guid PaymentMethodId { get; set; }
    public double Amount { get; set; }
    public Order Order { get; set; }
    public PaymentMethod PaymentMethod { get; set; }
    public PaymentStatus TransactionOrderStatus { get; set; } = PaymentStatus.Paid;
}
