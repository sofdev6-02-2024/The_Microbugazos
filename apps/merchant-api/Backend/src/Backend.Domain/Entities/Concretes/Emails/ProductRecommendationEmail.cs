using Backend.Domain.DTOs;
using Backend.Domain.DTOs.ProductItem.Concretes;
using Backend.Domain.Entities.Interfaces;

namespace Backend.Domain.Entities.Concretes.Emails
{
    public class ProductRecommendationEmail : IEmail
    {
        public List<ProductItemRecommendation> Products { get; set; }

        public ProductRecommendationEmail(Contact contact, List<ProductItemRecommendation> products)
        {
            Contact = contact;
            Products = products;
        }

        public Contact Contact { get; set; }
    }
}