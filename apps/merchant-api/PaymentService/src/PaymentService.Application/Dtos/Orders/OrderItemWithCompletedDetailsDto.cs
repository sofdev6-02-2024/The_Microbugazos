namespace PaymentService.Application.Dtos.Orders;

public class OrderItemWithCompletedDetailsDto
{
    public string ProductName { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public string Store { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public double BasePrice { get; set; }
    public OrderItemVariantDto OrderItemVariant { get; set; } = new();
}