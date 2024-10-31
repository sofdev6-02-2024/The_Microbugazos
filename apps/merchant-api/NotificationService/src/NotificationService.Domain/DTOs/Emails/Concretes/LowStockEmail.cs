using NotificationService.Domain.Dtos.OrderItems;

namespace NotificationService.Domain.Dtos.Emails
{
    public class LowStockEmail : Email
    {
        public List<OrderItem> OrderItems { get; set; }
        public string InventoryUrl { get; set; }
        private const string SubjectEmail = $"Low stock";

        public LowStockEmail(Contact contact, List<OrderItem> orderItems, string inventoryUrl) : base(contact, SubjectEmail)
        {
            OrderItems = orderItems;
            InventoryUrl = inventoryUrl;
        }
    }
}