namespace NotificationService.Domain.Dtos.OrderItems
{
    public class OrderItem
    {
        public string OrderItemName { get; set; }
        public int OrderItemQuantity { get; set; }

        public OrderItem(string orderItemName, int orderItemQuantity)
        {
            OrderItemName = orderItemName;
            OrderItemQuantity = orderItemQuantity;
        }
    }
}