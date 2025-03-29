using Backend.Domain.DTOs.Emails.Concretes.OrderStatusEmails.Abstracts;

namespace Backend.Domain.Entities.Interfaces.OrderStatusEmails
{
    public interface IOrderStatusWithTimeEmail : IOrderStatusEmail
    {
        public DateTime Time { get; set; }
    }
}