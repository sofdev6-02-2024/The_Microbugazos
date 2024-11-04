namespace NotificationService.Domain.Dtos.ProductItems
{
    public class ProductItemPromotion : ProductItemRecommendation
    {
        public decimal AfterPrice { get; set; }
        public decimal Price { get; set; }
        public decimal PercentageDiscount { get; set; }

        public ProductItemPromotion(string imageUrl, string productName, string productUrl, decimal afterPrice, decimal price, decimal percentageDiscount) : base(imageUrl, productName, productUrl)
        {
            AfterPrice = afterPrice;
            Price = price;
            PercentageDiscount = percentageDiscount;
        }
    }
}