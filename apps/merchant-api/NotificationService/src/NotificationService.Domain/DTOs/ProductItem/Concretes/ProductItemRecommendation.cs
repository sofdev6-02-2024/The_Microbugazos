namespace NotificationService.Domain.Dtos.ProductItems
{
    public class ProductItemRecommendation : ProductItem
    {
        public string ProductUrl { get; set; }

        public ProductItemRecommendation(string imageUrl, string productName, string productUrl) : base(imageUrl, productName)
        {
            ProductUrl = productUrl;
        }
    }
}