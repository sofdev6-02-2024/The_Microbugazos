namespace NotificationService.Domain.Dtos.Emails
{
    public class WelcomeEmail : Email
    {
        public WelcomeEmail(Contact contact) : base(contact) { }
    }
}