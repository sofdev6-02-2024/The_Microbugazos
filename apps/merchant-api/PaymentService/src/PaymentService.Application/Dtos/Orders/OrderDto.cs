namespace PaymentService.Application.Dtos.Orders;

public class OrderDto
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public string OrderStatus { get; set; } = String.Empty;
    public double TotalPrice { get; set; }
    public List<OrderItemDto> OrderItems { get; set; }
}