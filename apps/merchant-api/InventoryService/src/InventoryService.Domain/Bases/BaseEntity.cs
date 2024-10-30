using InventoryService.Domain.Interfaces;

namespace InventoryService.Domain.Bases;

public abstract class BaseEntity : BaseRegister, IEntity
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public bool IsActive { get; set; } = true;
}
