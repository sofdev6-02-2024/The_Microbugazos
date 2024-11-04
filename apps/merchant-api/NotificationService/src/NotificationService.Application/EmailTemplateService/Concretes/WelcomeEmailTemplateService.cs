using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Application.Services.Templates
{
    public class WelcomeEmailTemplateService : EmailTemplateService<WelcomeEmail>
    {
        public override async Task<string> GenerateEmailTemplate(WelcomeEmail email)
        {
            string templatePath = $"{EmailPath}welcome.html";
            string htmlTemplate = await File.ReadAllTextAsync(templatePath);

            htmlTemplate = htmlTemplate.Replace("{{Username}}", email.Contact.ContactName);

            return htmlTemplate;
        }
    }
}