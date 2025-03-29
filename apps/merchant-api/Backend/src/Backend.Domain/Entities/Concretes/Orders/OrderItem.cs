namespace Backend.Domain.Entities.Interfaces
{
    public class OrderItem
    {
        public OrderItem(string orderItemName, int orderItemQuantity, List<string>? attributes = null)
        {
            OrderItemName = orderItemName;
            OrderItemQuantity = orderItemQuantity;
            Attributes = attributes;
        }

        public string OrderItemName { get; set; }
        public int OrderItemQuantity { get; set; }
        public List<string> Attributes { get; set; }
    }
}