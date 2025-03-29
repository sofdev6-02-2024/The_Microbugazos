using Backend.Domain.DTOs;
using Backend.Domain.Entities.Interfaces;

namespace Backend.Domain.Entities.Concretes.Emails
{
    public class WelcomeEmail : IEmail
    {
        public Contact Contact { get; set; }

        public WelcomeEmail(Contact contact)
        {
            Contact = contact;
        }
    }
}