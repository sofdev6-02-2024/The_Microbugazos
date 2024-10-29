using NotificationService.Domain.Dtos.ProductItems;

namespace NotificationService.Domain.Dtos.Emails
{
    public class PendingEmail : OrderStatusWithProductsEmail
    {
        public PendingEmail(Contact contact, string orderNumber, List<ProductItem> products) : base(contact, orderNumber, products) { }
    }
}