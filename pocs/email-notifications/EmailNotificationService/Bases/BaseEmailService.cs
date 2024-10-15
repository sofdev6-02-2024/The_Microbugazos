using System.Net;
using System.Net.Mail;
using EmailNotificationService.Interfaces;

namespace EmailNotificationService.Bases;

public abstract class BaseEmailService(string server, int port, string username, string password) : IEmailService
{
    public async Task SendEmailAsync(string receiver, string subject, string body)
    {
        using SmtpClient client = new(server);
        client.Port = port;
        client.Credentials = new NetworkCredential(username, password);
        client.EnableSsl = true;

        using MailMessage mail = new();
        mail.From = new MailAddress(username);
        mail.Subject = subject;
        mail.Body = body;
        mail.IsBodyHtml = true;

        mail.To.Add(receiver);
        
        await client.SendMailAsync(mail);
    }
}