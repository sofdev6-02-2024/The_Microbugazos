namespace PaymentService.Application.Dtos.Orders;

public class OrderItemDto
{
    public Guid OrderItemId { get; set; }
    public Guid ProductId { get; set; }
    public Guid ProductVariantId { get; set; }
    public int Quantity { get; set; }
    public double UnitPrice { get; set; }
    public int DiscountPercent { get; set; }
    public double SubTotalPrice { get; set; }
}