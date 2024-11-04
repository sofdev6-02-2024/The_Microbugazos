using NotificationService.Application.Services.Templates;
using NotificationService.Application.Utils;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Application.Services
{
    public class StatusWithProductTemplateService : EmailTemplateService<OrderStatusWithProductsEmail>
    {
        private readonly string htmlPath;

        public StatusWithProductTemplateService(string htmlPath)
        {
            this.htmlPath = $"{htmlPath}.html";
        }

        public override async Task<string> GenerateEmailTemplate(OrderStatusWithProductsEmail email)
        {
            string templatePath = $"{EmailPath}{htmlPath}";
            string htmlTemplate = await File.ReadAllTextAsync(templatePath);

            htmlTemplate = htmlTemplate.Replace("{{OrderNumber}}", email.OrderNumber);
            htmlTemplate = htmlTemplate.Replace("{{Username}}", email.Contact.ContactName);
            htmlTemplate = htmlTemplate.Replace("{{Items}}", EmailExtraGenerator.GenerateProductItemTemplates(email.Products));

            return htmlTemplate;
        }
    }
}