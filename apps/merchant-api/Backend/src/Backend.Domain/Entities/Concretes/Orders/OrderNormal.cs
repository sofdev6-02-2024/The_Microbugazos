using Backend.Domain.DTOs.Orders.OrderItem.Concretes;

namespace Backend.Domain.Entities.Concretes.Orders
{
    public class OrderNormal
    {
        public OrderNormal(string orderNumber, List<OrderItemWithPrice> orderItems, decimal orderTotal)
        {
            OrderNumber = orderNumber;
            OrderItems = orderItems;
            OrderTotal = orderTotal;
        }

        public string OrderNumber { get; set; }
        public List<OrderItemWithPrice> OrderItems { get; set; }
        public decimal OrderTotal { get; set; }
    }
}