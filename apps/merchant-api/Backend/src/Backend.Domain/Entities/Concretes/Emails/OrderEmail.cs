using Backend.Domain.DTOs;
using Backend.Domain.Entities.Concretes.Orders;
using Backend.Domain.Entities.Interfaces;

namespace Backend.Domain.Entities.Concretes.Emails
{
    public class OrderEmail : IEmail
    {
        public OrderNormal Order { get; set; }
        public Contact Contact { get; set; }

        public OrderEmail(Contact contact, OrderNormal order)
        {
            Contact = contact;
            Order = order;
        }
    }
}