using Backend.Domain.DTOs;
using Backend.Domain.Entities.Concretes;

namespace Backend.Domain.Entities.Interfaces
{
    public interface IEmail
    {
        public Contact Contact { get; set; }
    }
}