using System.Text;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Domain.Dtos.OrderItems;

namespace NotificationService.Application.Services.Templates
{
    public class InvoiceEmailTemplateService : EmailTemplateService<OrderEmail>
    {
        public override async Task<string> GenerateEmailTemplate(OrderEmail email)
        {
            string templatePath = $"{EmailPath}invoice.html";
            string htmlTemplate = await File.ReadAllTextAsync(templatePath);

            htmlTemplate = htmlTemplate.Replace("{{ContactEmail}}", email.Contact.ContactEmail);
            htmlTemplate = htmlTemplate.Replace("{{OrderDate}}", DateTime.Now.ToString("yyyy-MM-dd"));
            htmlTemplate = htmlTemplate.Replace("{{OrderNumber}}", email.Order.OrderNumber);
            htmlTemplate = htmlTemplate.Replace("{{Items}}", GenerateTable(email.Order.OrderItems));
            htmlTemplate = htmlTemplate.Replace("{{Price}}", $"{email.Order.OrderTotal}");

            return htmlTemplate;
        }

        private static string GenerateTable(List<OrderItemWithPrice> items)
        {
            StringBuilder tableResult = new StringBuilder();

            foreach (var item in items)
            {
                decimal totalItemPrice = item.OrderItemPrice * item.OrderItemQuantity;

                var variantAttributesList = string.Join("<br>", 
                    item.ProductVariantDetails.Attributes.Select(a => $"{a.Name}: {a.Value}"));

                tableResult.Append("<tr>");
                tableResult.Append($"<td>{item.OrderItemName}</td>");
                tableResult.Append($"<td style='width: 100px; text-align:center;'>{item.OrderItemQuantity}</td>");
                tableResult.Append($"<td style='width: 100px; text-align:center;'>{item.ProductVariantDetails.BasePrice:F2}</td>");
                tableResult.Append($"<td style='width: 100px; text-align:center;'>{item.ProductVariantDetails.PriceAdjustment:F2}</td>");
                tableResult.Append($"<td style='width: 100px; text-align:center;'>{totalItemPrice:F2}</td>");
                tableResult.Append($"<td style='width: 100px; text-align:center;'>{variantAttributesList}</td>");
                tableResult.Append("</tr>");
            }

            return tableResult.ToString();
        }
    }
}