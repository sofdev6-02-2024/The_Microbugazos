using InventoryService.Domain.Interfaces;

namespace InventoryService.Domain.Bases;

public abstract class BaseEntity : BaseRegister, IEntity
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public bool IsActive { get; set; } = true;

    public override bool Equals(object? obj)
    {
        if (obj is IEntity other) 
            return Id == other.Id && IsActive == other.IsActive;
        return false;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Id, IsActive);
    }
}
