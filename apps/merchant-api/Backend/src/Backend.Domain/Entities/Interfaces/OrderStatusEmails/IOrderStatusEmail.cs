using Backend.Domain.Entities.Interfaces;

namespace Backend.Domain.DTOs.Emails.Concretes.OrderStatusEmails.Abstracts
{
    public interface IOrderStatusEmail : IEmail
    {
        public string OrderNumber { get; set; }
    }
}