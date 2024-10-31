namespace NotificationService.Domain.Dtos.OrderItems
{
    public class OrderItemWithPrice : OrderItem
    {
        public decimal OrderItemPrice { get; set; }

        public OrderItemWithPrice(string orderItemName, int orderItemQuantity, decimal orderItemPrice) : base(orderItemName, orderItemQuantity)
        {
            OrderItemPrice = orderItemPrice;
        }
    }
}