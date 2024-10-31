using NotificationService.Domain.Dtos.ProductItems;

namespace NotificationService.Domain.Dtos.Emails
{
    public class PromotionEmail : Email
    {
        public List<ProductItemPromotion> Products { get; set; }
        private const string SubjectEmail = "Promotions";

        public PromotionEmail(Contact contact, List<ProductItemPromotion> products) : base(contact, SubjectEmail)
        {
            Products = products;
        }
    }
}