namespace NotificationService.Domain.Dtos.Emails
{
    public class OrderStatusEmail :  Email
    {
        public string OrderNumber { get; set; }

        public OrderStatusEmail(Contact contact, string orderNumber) : base(contact)
        {
            OrderNumber = orderNumber;
        }
    }
}