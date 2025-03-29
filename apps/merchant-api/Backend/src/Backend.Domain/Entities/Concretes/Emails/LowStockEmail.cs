using Backend.Domain.DTOs;
using Backend.Domain.Entities.Interfaces;

namespace Backend.Domain.Entities.Concretes.Emails
{
    public class LowStockEmail : IEmail
    {
        public List<OrderItem> OrderItems { get; set; }
        public string InventoryUrl { get; set; }

        public Contact Contact { get; set; }

        public LowStockEmail(Contact contact, List<OrderItem> orderItems, string inventoryUrl)
        {
            OrderItems = orderItems;
            InventoryUrl = inventoryUrl;
            Contact = contact;
        }
    }
}