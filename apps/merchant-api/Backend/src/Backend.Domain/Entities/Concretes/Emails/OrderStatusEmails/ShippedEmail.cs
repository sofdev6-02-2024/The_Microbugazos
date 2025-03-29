using Backend.Domain.DTOs;
using Backend.Domain.Entities.Interfaces.OrderStatusEmails;

namespace Backend.Domain.Entities.Concretes.Emails.OrderStatusEmails
{
    public class ShippedEmail : IOrderStatusWithTimeEmail
    {
        public ShippedEmail(Contact contact, string orderNumber)
        {
            Contact = contact;
            OrderNumber = orderNumber;
            Time = DateTime.Now;
        }
        
        public Contact Contact { get; set; }
        public string OrderNumber { get; set; }
        public DateTime Time { get; set; }
    }
}