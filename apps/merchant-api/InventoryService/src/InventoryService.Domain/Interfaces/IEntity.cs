namespace InventoryService.Domain.interfaces;

public interface IEntity : IRegister
{
    Guid Id { get; }
    bool IsActive { get; set; }
}
