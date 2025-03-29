using Backend.Domain.DTOs;
using Backend.Domain.Entities.Concretes.Orders;
using Backend.Domain.Entities.Interfaces;

namespace Backend.Domain.Entities.Concretes.Emails
{
    public class OrderWithDiscountEmail : IEmail
    {
        public OrderWithDiscount Order { get; set; }
        public Contact Contact { get; set; }

        public OrderWithDiscountEmail(Contact contact, OrderWithDiscount order)
        {
            Contact = contact;
            Order = order;
        }
    }
}