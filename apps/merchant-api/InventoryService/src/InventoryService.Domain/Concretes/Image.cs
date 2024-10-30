using InventoryService.Domain.Bases;

namespace InventoryService.Domain.Concretes;

public class Image : BaseEntity
{
    public Guid ProductId { get; set; }
    public string AltText { get; set; }
    public string Url { get; set; }
    public Product Product { get; set; }
    public ProductVariant ProductVariant { get; set; } 
}