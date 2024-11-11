namespace NotificationService.Domain.Dtos.Emails
{
    public class ShippedEmail : OrderStatusWithTimeEmail
    {
        public ShippedEmail(Contact contact, string orderNumber) : base(contact, orderNumber, DateTime.Now) { }
    }
}