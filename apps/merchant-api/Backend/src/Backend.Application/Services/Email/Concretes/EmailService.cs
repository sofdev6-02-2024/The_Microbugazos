using System.Net;
using System.Net.Mail;
using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Interfaces;

namespace Backend.Application.Services.Email.Concretes
{
    public class EmailService<T> : IEmailService<T>
    {
        public EmailTemplateService<T> EmailTemplateService { get; set; }

        public EmailService(EmailTemplateService<T> emailTemplateService)
        {
            EmailTemplateService = emailTemplateService;
        }
        public async Task Send(string receiver, string subject, T objectEmail)
        {
            string body = await EmailTemplateService.GenerateEmailTemplate(objectEmail);

            string? server = Environment.GetEnvironmentVariable("EMAIL_SERVICE");
            int port = int.TryParse(Environment.GetEnvironmentVariable("EMAIL_PORT"), out var parsedPort) ? parsedPort : default;
            string username = Environment.GetEnvironmentVariable("EMAIL_USERNAME") ?? string.Empty;
            string? password = Environment.GetEnvironmentVariable("EMAIL_PASSWORD");

            using SmtpClient client = new SmtpClient(server);
            client.Port = port;
            client.Credentials = new NetworkCredential(username, password);
            client.EnableSsl = true;

            using MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(username);
            mailMessage.Subject = subject;
            mailMessage.Body = body;
            mailMessage.IsBodyHtml = true;

            mailMessage.To.Add(receiver);

            await client.SendMailAsync(mailMessage);
        }
    }
}