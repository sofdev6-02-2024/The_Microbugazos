namespace NotificationService.Domain.Dtos.Emails
{
    public class OrderStatusEmail :  Email
    {
        public string OrderNumber { get; set; }
        private const string SubjectEmail = "Order status";

        public OrderStatusEmail(Contact contact, string orderNumber) : base(contact, SubjectEmail)
        {
            OrderNumber = orderNumber;
        }
    }
}