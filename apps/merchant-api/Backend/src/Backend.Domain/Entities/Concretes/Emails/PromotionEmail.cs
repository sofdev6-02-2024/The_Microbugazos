using Backend.Domain.DTOs;
using Backend.Domain.DTOs.ProductItem.Concretes;
using Backend.Domain.Entities.Interfaces;

namespace Backend.Domain.Entities.Concretes.Emails
{
    public class PromotionEmail : IEmail
    {
        public List<ProductItemPromotion> Products { get; set; }

        public Contact Contact { get; set; }

        public PromotionEmail(Contact contact, List<ProductItemPromotion> products)
        {
            Contact = contact;
            Products = products;
        }
    }
}