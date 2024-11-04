namespace NotificationService.Domain.Dtos.Emails
{
    public class ReturnedEmail : OrderStatusWithTimeEmail
    {
        public ReturnedEmail(Contact contact, string orderNumber) : base(contact, orderNumber, DateTime.Now) { }
    }
}