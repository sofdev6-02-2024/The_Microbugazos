using Backend.Application.Services.Email.Bases;
using Backend.Application.Utils;
using Backend.Domain.Entities.Interfaces.OrderStatusEmails;

namespace Backend.Application.Services.Email.Templates.OrdersStatus
{
    public class StatusWithProductTemplateService : EmailTemplateService<IOrderStatusWithProductsEmail>
    {
        private readonly string htmlPath;

        public StatusWithProductTemplateService(string htmlPath)
        {
            this.htmlPath = $"{htmlPath}.html";
        }

        public override async Task<string> GenerateEmailTemplate(IOrderStatusWithProductsEmail email)
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