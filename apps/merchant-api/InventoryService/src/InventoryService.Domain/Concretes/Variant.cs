using InventoryService.Domain.Bases;

namespace InventoryService.Domain.Concretes;

public class Variant : BaseEntity
{ 
    public string Name { get; set; } = string.Empty;
    public ICollection<ProductAttribute> ProductAttributes { get; set; } = new List<ProductAttribute>();    
}