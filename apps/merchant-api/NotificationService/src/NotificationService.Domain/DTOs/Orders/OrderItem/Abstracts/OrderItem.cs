namespace NotificationService.Domain.Dtos.OrderItems
{
    public class OrderItem
    {
        public string OrderItemName { get; set; }
        public int OrderItemQuantity { get; set; }
        public List<string> Attributes { get; set; }

        public OrderItem(string orderItemName, int orderItemQuantity, List<string>? attributes = null)
        {
            OrderItemName = orderItemName;
            OrderItemQuantity = orderItemQuantity;
            Attributes = attributes ?? [];
        }
    }
}