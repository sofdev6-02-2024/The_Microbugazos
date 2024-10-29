using NotificationService.Domain.Dtos.ProductItems;

namespace NotificationService.Domain.Dtos.Emails
{
    public class ConfirmedEmail : OrderStatusWithProductsEmail
    {
        public ConfirmedEmail(Contact contact, string orderNumber, List<ProductItem> productItems) : base(contact, orderNumber, productItems) { }
    }
}