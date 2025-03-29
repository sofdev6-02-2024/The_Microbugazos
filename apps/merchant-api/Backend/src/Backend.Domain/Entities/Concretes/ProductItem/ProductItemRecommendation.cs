using Backend.Domain.DTOs.ProductItem.Abstracts;

namespace Backend.Domain.DTOs.ProductItem.Concretes
{
    public class ProductItemRecommendation : IProductItem
    {
        public string ProductUrl { get; set; }
        public string ImageUrl { get; set; }
        public string ProductName { get; set; }

        public ProductItemRecommendation(string imageUrl, string productName, string productUrl)
        {
            ImageUrl = imageUrl;
            ProductName = productName;
            ProductUrl = productUrl;
        }
    }
}