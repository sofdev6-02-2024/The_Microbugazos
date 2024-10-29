using NotificationService.Domain.Dtos.OrderItems;

namespace NotificationService.Domain.Dtos.Orders
{
    public class OrderWithDiscount : OrderNormal
    {
        public int DiscountPercentage { get; set; }
        public decimal OrderFinalTotal { get; set; }

        public OrderWithDiscount(string orderNumber, List<OrderItemWIthPrice> orderItems, decimal orderTotal, int discountPercentage)
            : base(orderNumber, orderItems, orderTotal)
        {
            DiscountPercentage = discountPercentage;
            OrderFinalTotal = orderTotal;
        }
    }
}