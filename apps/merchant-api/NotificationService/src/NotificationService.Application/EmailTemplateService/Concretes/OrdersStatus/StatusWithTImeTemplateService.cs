using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Application.Services.Templates
{
    public class StatusWithTImeTemplateService : EmailTemplateService<OrderStatusWithTimeEmail>
    {
        private readonly string htmlPath;

        public StatusWithTImeTemplateService(string htmlPath)
        {
            this.htmlPath = $"{htmlPath}.html";
        }

        public override async Task<string> GenerateEmailTemplate(OrderStatusWithTimeEmail email)
        {
            string templatePath = $"{EmailPath}{htmlPath}";
            string htmlTemplate = await File.ReadAllTextAsync(templatePath);

            htmlTemplate = htmlTemplate.Replace("{{OrderNumber}}", email.OrderNumber);
            htmlTemplate = htmlTemplate.Replace("{{Username}}", email.Contact.ContactName);
            htmlTemplate = htmlTemplate.Replace("{{Time}}", $"{email.Time}");

            return htmlTemplate;
        }
    }
}