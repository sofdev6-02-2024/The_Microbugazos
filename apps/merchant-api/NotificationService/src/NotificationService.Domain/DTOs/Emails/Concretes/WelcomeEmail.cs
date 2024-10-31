namespace NotificationService.Domain.Dtos.Emails
{
    public class WelcomeEmail : Email
    {
        private const string SubjectEmail = "Welcome";
        public WelcomeEmail(Contact contact) : base(contact, SubjectEmail) { }
    }
}