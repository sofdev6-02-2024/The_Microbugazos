using Backend.Domain.DTOs.Orders.OrderItem.Concretes;

namespace Backend.Domain.Entities.Concretes.Orders
{
    public class OrderWithDiscount : OrderNormal
    {
        public int DiscountPercentage { get; set; }
        public decimal OrderFinalTotal { get; set; }

        public OrderWithDiscount(string orderNumber, List<OrderItemWithPrice> orderItems, decimal orderTotal, int discountPercentage) : base(orderNumber, orderItems, orderTotal)
        {
            DiscountPercentage = discountPercentage;
            OrderFinalTotal = orderTotal;
        }
    }
}