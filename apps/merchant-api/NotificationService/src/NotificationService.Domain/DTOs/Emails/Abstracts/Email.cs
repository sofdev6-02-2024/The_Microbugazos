namespace NotificationService.Domain.Dtos.Emails
{
    public class Email
    {
        public Contact Contact { get; set; }
        public string Subject { get; set; }
        public bool IsHtml { get; set; }

        public Email(Contact contact, string subject)
        {
            Contact = contact;
            Subject = subject;
            IsHtml = true;
        }
    }
}