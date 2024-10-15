using EmailNotificationService.Bases;

namespace EmailNotificationService.Concretes;

public class GmailService(string username, string password)
    : BaseEmailService("smtp.gmail.com", 587, username, password)
{
    public async Task SendSimpleNotificationAsync(string receiver)
    {
        string subject = "Simple Notification for Test Email";
        string body = "This is a test notification sent from the GmailService.";

        await SendEmailAsync(receiver, subject, body);
    }
}