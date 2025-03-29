using System.Text;
using Backend.Application.Services.Email.Bases;
using Backend.Domain.DTOs.ProductItem.Concretes;
using Backend.Domain.Entities.Concretes.Emails;

namespace Backend.Application.Services.Email.Templates
{
    public class ProductRecommendationEmailTemplateService : EmailTemplateService<ProductRecommendationEmail>
    {
        public override async Task<string> GenerateEmailTemplate(ProductRecommendationEmail email)
        {
            string templatePath = $"{EmailPath}product-recomendations.html";

            string htmlTemplate = await File.ReadAllTextAsync(templatePath);

            htmlTemplate = htmlTemplate.Replace("{{Username}}", email.Contact.ContactName);
            htmlTemplate = htmlTemplate.Replace("{{Items}}", GenerateRecommendations(email.Products));

            return htmlTemplate;
        }

        private static string GenerateRecommendations(List<ProductItemRecommendation> recommendations) {
            StringBuilder recommendationsResult = new StringBuilder();

            foreach (var recommendation in recommendations)
            {
                recommendationsResult.Append("<div class='item'>");
                recommendationsResult.Append($"<img src={recommendation.ImageUrl} alt='Item' class='product-item-image' />");
                recommendationsResult.Append($"<p class='product-item-name'>{recommendation.ProductName}</p>");
                recommendationsResult.Append($"<a href={recommendation.ProductUrl} class='product-item-button'>Go store</a>");
                recommendationsResult.Append("</div>");
            }

            return recommendationsResult.ToString();
        }
    }
}