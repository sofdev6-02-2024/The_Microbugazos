using System.Text;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Application.Services.Templates
{
    public class NewUserEmailTemplateService : EmailTemplateService<NewUserEmail>
    {
        public override async Task<string> GenerateEmailTemplate(NewUserEmail email)
        {
            string templatePath = $"{EmailPath}new-user.html";
            string htmlTemplate = await File.ReadAllTextAsync(templatePath);

            htmlTemplate = htmlTemplate.Replace("{{Username}}", email.Contact.ContactName);
            htmlTemplate = htmlTemplate.Replace("{{UserType}}", email.UserType);
            htmlTemplate = htmlTemplate.Replace("{{Storename}}", email.StoreName);
            htmlTemplate = htmlTemplate.Replace("{{StoreEmail}}", email.StoreEmail);
            htmlTemplate = htmlTemplate.Replace("{{Content}}", GenerateList(email.Responsibilities));
            htmlTemplate = htmlTemplate.Replace("{{Url}}", email.AdminPanelUrl);

            return htmlTemplate;
        }

        private static string GenerateList(List<string> items)
        {
            StringBuilder listResult = new StringBuilder();

            foreach (var item in items)
            {
                listResult.Append($"<li>{item}</li>");
            }

            return listResult.ToString();
        }
    }
}