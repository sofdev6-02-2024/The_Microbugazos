using NotificationService.Domain.Dtos.ProductItems;

namespace NotificationService.Domain.Dtos.Emails
{
    public class ProductRecommendationEmail : Email
    {
        public List<ProductItemRecommendation> Products { get; set; }

        public ProductRecommendationEmail(Contact contact, List<ProductItemRecommendation> products) : base(contact)
        {
            Products = products;
        }
    }
}