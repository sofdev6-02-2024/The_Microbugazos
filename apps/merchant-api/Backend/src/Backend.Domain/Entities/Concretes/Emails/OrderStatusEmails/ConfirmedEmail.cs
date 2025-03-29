using Backend.Domain.DTOs;
using Backend.Domain.Entities.Interfaces.OrderStatusEmails;

namespace Backend.Domain.Entities.Concretes.Emails.OrderStatusEmails
{
    public class ConfirmedEmail : IOrderStatusWithProductsEmail
    {
        public ConfirmedEmail(Contact contact, string orderNumber, List<DTOs.ProductItem.Abstracts.IProductItem> products)
        {
            Contact = contact;
            OrderNumber = orderNumber;
            Products = products;
        }
        public Contact Contact { get; set; }
        public string OrderNumber { get; set; }
        public List<DTOs.ProductItem.Abstracts.IProductItem> Products { get; set; }
    }
}