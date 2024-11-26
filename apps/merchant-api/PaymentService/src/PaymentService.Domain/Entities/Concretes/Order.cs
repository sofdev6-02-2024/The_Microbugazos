using PaymentService.Domain.Entities.Bases;
using PaymentService.Domain.Entities.Enums;

namespace PaymentService.Domain.Entities.Concretes;

public class Order : BaseEntity
{
    public Guid UserId { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public double TotalPrice { get; set; }
    public PaymentTransaction? PaymentTransaction { get; set; }
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}