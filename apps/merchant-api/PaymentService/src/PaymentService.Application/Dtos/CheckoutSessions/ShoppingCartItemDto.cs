namespace PaymentService.Application.Dtos.CheckoutSessions;

public class ShoppingCartItemDto
{
    public Guid ProductVariantId { get; set; }
    public string Name { get; set; } = string.Empty;
    public double Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public int Quantity { get; set; }
}
