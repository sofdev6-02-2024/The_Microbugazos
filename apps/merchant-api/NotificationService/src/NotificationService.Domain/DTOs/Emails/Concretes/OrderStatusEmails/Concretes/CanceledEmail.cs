using NotificationService.Domain.Dtos.ProductItems;

namespace NotificationService.Domain.Dtos.Emails
{
    public class CanceledEmail : OrderStatusWithProductsEmail
    {
        public CanceledEmail(Contact contact, string orderNumber, List<ProductItem> products) : base(contact, orderNumber, products) { }
    }
}