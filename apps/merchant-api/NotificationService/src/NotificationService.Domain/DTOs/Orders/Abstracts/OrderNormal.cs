using NotificationService.Domain.Dtos.OrderItems;

namespace NotificationService.Domain.Dtos.Orders
{
    public class OrderNormal(string orderNumber, List<OrderItemWithPrice> orderItems, decimal orderTotal)
    {
        public string OrderNumber { get; set; } = orderNumber;
        public List<OrderItemWithPrice> OrderItems { get; set; } = orderItems;
        public decimal OrderTotal { get; set; } = orderTotal;
    }
}