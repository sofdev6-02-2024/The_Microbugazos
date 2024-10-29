namespace NotificationService.Domain.Dtos.Emails
{
    public class DeliveredEmail : OrderStatusWithTimeEmail
    {
        public DeliveredEmail(Contact contact, string orderNumber) : base(contact, orderNumber, DateTime.Now) { }
    }
}