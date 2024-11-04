namespace NotificationService.Domain.Dtos.ProductItems
{
    public class ProductItem
    {
        public string ImageUrl { get; set; }
        public string ProductName { get; set; }

        public ProductItem(string imageUrl, string productName)
        {
            ImageUrl = imageUrl;
            ProductName = productName;
        }
    }
}