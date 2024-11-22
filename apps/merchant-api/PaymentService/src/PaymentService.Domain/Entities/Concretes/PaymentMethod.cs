using PaymentService.Domain.Entities.Bases;

namespace PaymentService.Domain.Entities.Concretes;

public class PaymentMethod : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public ICollection<PaymentTransaction> PaymentTransactions { get; set; }
}