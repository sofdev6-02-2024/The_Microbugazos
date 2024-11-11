using NotificationService.Domain.Dtos.Orders;

namespace NotificationService.Domain.Dtos.Emails
{
    public class OrderEmail : Email
    {
        public OrderNormal Order { get; set; }

        public OrderEmail(Contact contact, OrderNormal order) : base(contact)
        {
            Order = order;
        }
    }
}