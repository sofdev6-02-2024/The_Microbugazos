namespace PaymentService.Application.Dtos.Orders;

public class CreateOrderItemDto
{
    public Guid ProductVariantId { get; set; }
    public int Quantity { get; set; }
    public int DiscountPercent { get; set; }
}