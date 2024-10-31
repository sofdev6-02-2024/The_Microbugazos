using NotificationService.Domain.Dtos.Orders;

namespace NotificationService.Domain.Dtos.Emails
{
    public class OrderWithDiscountEmail : Email
    {
        public OrderWithDiscount Order { get; set; }
        private const string SubjectEmail = "Invoice";

        public OrderWithDiscountEmail(Contact contact, OrderWithDiscount order) : base(contact, SubjectEmail)
        {
            Order = order;
        }
    }
}