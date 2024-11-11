using System.Text;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Domain.Dtos.ProductItems;

namespace NotificationService.Application.Services.Templates
{
    public class PromotionEmailTemplateService : EmailTemplateService<PromotionEmail>
    {
        public override async Task<string> GenerateEmailTemplate(PromotionEmail email)
        {
            string templatePath = $"{EmailPath}promotion.html";
            string htmlTemplate = await File.ReadAllTextAsync(templatePath);

            htmlTemplate = htmlTemplate.Replace("{{Username}}", email.Contact.ContactName);
            htmlTemplate = htmlTemplate.Replace("{{Items}}", GenerateItems(email.Products));

            return htmlTemplate;
        }

        private static string GenerateItems(List<ProductItemPromotion> items)
        {
            StringBuilder result = new StringBuilder();

            foreach (var item in items)
            {
                result.Append("<div class='item'>");
                result.Append("<div class='discount-item-section'>");
                result.Append($"<p class='discount'>{item.PercentageDiscount}%</p>");
                result.Append("</div>");
                result.Append($"<img src={item.ImageUrl} alt='Item' class='product-item-image' />");
                result.Append($"<p class='product-item-name'>{item.ProductName}</p>");
                result.Append("<div class='price-item-section'>");
                result.Append("<div class='price-section'>");
                result.Append($"<p class='price'>{item.Price} $us</p>");
                result.Append($"<p class='after-price'>{item.AfterPrice} $us</p>");
                result.Append("</div>");
                result.Append("</div>");
                result.Append($"<a href={item.ProductUrl} class='product-item-button'>Go store</a>");
                result.Append("</div>");
            }

            return result.ToString();
        }
    }
}