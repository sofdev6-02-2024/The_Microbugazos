using System.Text;
using NotificationService.Domain.Dtos.OrderItems;
using NotificationService.Domain.Dtos.ProductItems;

namespace NotificationService.Application.Utils
{
    public static class EmailExtraGenerator
    {
        public static string GenerateProductItemTemplates(List<ProductItem> items)
        {
            StringBuilder result = new StringBuilder();

            foreach (var item in items)
            {
                result.Append($"<div class='item'><img src={item.ImageUrl} alt='Item' class='product-item-image' /><p class='product-item-name'>{item.ProductName}</p></div>");
            }

            return result.ToString();
        }

        public static string GenerateTableInvoice(List<OrderItemWIthPrice> items)
        {
            StringBuilder tableResult = new StringBuilder();

            foreach (var item in items)
            {
                tableResult.Append("<tr>");
                tableResult.Append($"<td>{item.OrderItemName}</td>");
                tableResult.Append($"<td style='width: 100px; text-align:center;'>{item.OrderItemQuantity}</td>");
                tableResult.Append($"<td style='width: 100px; text-align:center;'>{item.OrderItemPrice}</td>");
                tableResult.Append("</tr>");
            }

            return tableResult.ToString();
        }
    }
}