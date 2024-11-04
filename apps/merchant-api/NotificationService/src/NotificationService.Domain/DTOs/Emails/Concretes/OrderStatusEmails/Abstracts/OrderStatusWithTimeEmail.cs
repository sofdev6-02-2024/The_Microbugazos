namespace NotificationService.Domain.Dtos.Emails
{
    public class OrderStatusWithTimeEmail : OrderStatusEmail
    {
        public DateTime Time { get; set; }

        public OrderStatusWithTimeEmail(Contact contact, string orderNumber, DateTime time) : base(contact, orderNumber)
        {
            Time = time;
        }
    }
}