using PaymentService.Domain.Entities.Bases;

namespace PaymentService.Domain.Entities.Concretes;

public class OrderItem : BaseEntity
{
    public Guid OrderId { get; set; }
    public Guid ProductVariantId { get; set; }
    public int Quantity { get; set; }
    public double UnitPrice { get; set; }
    public int DiscountPercent { get; set; }
    public double TotalPrice { get; set; }
    public Order? Order { get; set; }
}
