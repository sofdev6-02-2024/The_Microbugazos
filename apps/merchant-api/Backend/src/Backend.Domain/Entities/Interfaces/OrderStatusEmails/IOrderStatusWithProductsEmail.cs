using Backend.Domain.DTOs.Emails.Concretes.OrderStatusEmails.Abstracts;

namespace Backend.Domain.Entities.Interfaces.OrderStatusEmails
{
    public interface IOrderStatusWithProductsEmail : IOrderStatusEmail
    {
        public List<DTOs.ProductItem.Abstracts.IProductItem> Products { get; set; }
    }
}