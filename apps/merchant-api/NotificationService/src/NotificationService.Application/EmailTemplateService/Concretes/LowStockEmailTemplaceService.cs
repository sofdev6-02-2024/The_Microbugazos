using System.Text;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Domain.Dtos.OrderItems;

namespace NotificationService.Application.Services.Templates
{
    public class LowStockEmailTemplaceService : EmailTemplateService<LowStockEmail>
    {
        public override async Task<string> GenerateEmailTemplate(LowStockEmail email)
        {
            string templatePath = $"{EmailPath}low-stock.html";
            string htmlTemplate = await File.ReadAllTextAsync(templatePath);

            htmlTemplate = htmlTemplate.Replace("{{Username}}", email.Contact.ContactName);
            htmlTemplate = htmlTemplate.Replace("{{Content}}", GenerateTable(email.OrderItems));
            htmlTemplate = htmlTemplate.Replace("{{Url}}", email.InventoryUrl);

            Console.WriteLine(htmlTemplate);
            return htmlTemplate;
        }

        private static string GenerateTable(List<OrderItem> items)
        {
            StringBuilder table = new StringBuilder();

            foreach (var item in items)
            {
                table.Append("<tr>");
                table.Append($"<td>{item.OrderItemName}</td>");
                table.Append($"<td style='width: 120px; text-align:center;'>{GenerateAttributes(item.Attributes)}</td>");
                table.Append($"<td style='width: 100px; text-align:center;'>{item.OrderItemQuantity}</td>");
                table.Append("</tr>");
            }
            return table.ToString();
        }

        private static string GenerateAttributes(List<string> attributes)
        {
            StringBuilder table = new();

            foreach (var attribute in attributes)
            {               
                table.Append($"<p>");
                table.Append($"{attribute}");
                table.Append("</p>");
            }
            return table.ToString();
        }
    }
}