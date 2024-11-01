namespace NotificationService.Domain.Dtos.Emails
{
    public class Email
    {
        public Contact Contact { get; set; }

        public Email(Contact contact)
        {
            Contact = contact;
        }
    }
}