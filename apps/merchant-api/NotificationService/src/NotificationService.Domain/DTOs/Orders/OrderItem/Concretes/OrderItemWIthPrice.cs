namespace NotificationService.Domain.Dtos.OrderItems
{
    public class OrderItemWIthPrice : OrderItem
    {
        public decimal OrderItemPrice { get; set; }

        public OrderItemWIthPrice(string orderItemName, int orderItemQuantity, decimal orderItemPrice) : base(orderItemName, orderItemQuantity)
        {
            OrderItemPrice = orderItemPrice;
        }
    }
}