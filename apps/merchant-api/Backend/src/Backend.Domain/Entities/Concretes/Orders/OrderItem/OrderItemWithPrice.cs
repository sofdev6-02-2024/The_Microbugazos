using System.Text.Json.Serialization;
using Backend.Domain.Entities.Interfaces;

namespace Backend.Domain.DTOs.Orders.OrderItem.Concretes
{
    public class OrderItemWithPrice : Entities.Interfaces.OrderItem
    {
        public decimal OrderItemPrice { get; set; }
        public ProductVariantDetails ProductVariantDetails { get; set; }
        

        public OrderItemWithPrice(string orderItemName, int orderItemQuantity, decimal orderItemPrice, ProductVariantDetails productVariantDetails) : base(orderItemName, orderItemQuantity)
        {
            OrderItemPrice = orderItemPrice;
            ProductVariantDetails = productVariantDetails;
        }
    }
    
    public record ProductVariantDetails(
        [property: JsonPropertyName("productId")] Guid ProductId,
        [property: JsonPropertyName("basePrice")] decimal BasePrice,
        [property: JsonPropertyName("priceAdjustment")] decimal PriceAdjustment,
        [property: JsonPropertyName("attributes")] List<ProductVariantAttribute> Attributes)
    {
        public Guid ProductVariantId { get; set; } = ProductId;
        public decimal BasePrice { get; set; } = BasePrice;
        public decimal PriceAdjustment { get; set; } = PriceAdjustment;
        public List<ProductVariantAttribute> Attributes { get; set; } = Attributes;
    }

    public class ProductVariantAttribute (string name, string value)
    {
        public string Name { get; set; } = name;
        public string Value { get; set; } = value;
    }
}