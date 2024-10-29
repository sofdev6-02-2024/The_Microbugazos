using NotificationService.Domain.Dtos.OrderItems;

namespace NotificationService.Domain.Dtos.Orders
{
    public class OrderNormal
    {
        public string OrderNumber { get; set; }
        public List<OrderItemWIthPrice> OrderItems { get; set; }
        public decimal OrderTotal { get; set; }

        public OrderNormal(string orderNumber, List<OrderItemWIthPrice> orderItems, decimal orderTotal)
        {
            OrderNumber = orderNumber;
            OrderItems = orderItems;
            OrderTotal = orderTotal;
        }
    }
}