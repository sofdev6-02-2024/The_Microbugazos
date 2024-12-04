namespace PaymentService.Application.Dtos.Orders;

public class OrderItemVariantDto
{
    public int Quantity { get; set; }
    public double UnitPrice { get; set; }
    public int DiscountPercent { get; set; }
    public double SubTotalPrice { get; set; }
}