using Backend.Application.Services.Email.Bases;
using Backend.Domain.Entities.Interfaces.OrderStatusEmails;

namespace Backend.Application.Services.Email.Templates.OrdersStatus
{
    public class StatusWithTImeTemplateService : EmailTemplateService<IOrderStatusWithTimeEmail>
    {
        private readonly string htmlPath;

        public StatusWithTImeTemplateService(string htmlPath)
        {
            this.htmlPath = $"{htmlPath}.html";
        }

        public override async Task<string> GenerateEmailTemplate(IOrderStatusWithTimeEmail email)
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