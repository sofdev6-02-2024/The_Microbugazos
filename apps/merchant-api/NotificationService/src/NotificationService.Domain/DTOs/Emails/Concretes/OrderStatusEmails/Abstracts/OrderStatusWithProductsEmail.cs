using NotificationService.Domain.Dtos.ProductItems;

namespace NotificationService.Domain.Dtos.Emails
{
    public class OrderStatusWithProductsEmail : OrderStatusEmail
    {
        public List<ProductItem> Products { get; set; }

        public OrderStatusWithProductsEmail(Contact contact, string orderNumber, List<ProductItem> products) : base(contact, orderNumber)
        {
            Products = products;
        }
    }
}