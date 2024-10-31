using NotificationService.Domain.Dtos.Orders;

namespace NotificationService.Domain.Dtos.Emails
{
    public class OrderEmail : Email
    {
        public OrderNormal Order { get; set; }
        private const string SubjectEmail = "Invoice";

        public OrderEmail(Contact contact, OrderNormal order) : base(contact, SubjectEmail)
        {
            Order = order;
        }
    }
}