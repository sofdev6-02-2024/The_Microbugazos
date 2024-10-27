using InventoryService.Domain.bases;

namespace InventoryService.Domain.concretes;

public class Variant : BaseEntity
{ 
    public string Name { get; set; }
    public ICollection<ProductAttribute> ProductAttributes { get; set; }
}