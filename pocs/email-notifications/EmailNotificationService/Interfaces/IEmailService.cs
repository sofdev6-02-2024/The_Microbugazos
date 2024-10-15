namespace EmailNotificationService.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string receiver, string subject, string body);
}
