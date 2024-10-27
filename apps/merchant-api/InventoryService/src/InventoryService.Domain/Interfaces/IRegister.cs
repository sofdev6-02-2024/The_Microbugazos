namespace InventoryService.Domain.interfaces;

public interface IRegister
{
    DateTime CreatedAt { get; }
    DateTime? UpdatedAt { get; set; }
    DateTime? DeletedAt { get; set; }
}
