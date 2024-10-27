using InventoryService.Domain.interfaces;

namespace InventoryService.Domain.bases;

public abstract class BaseRegister : IRegister
{
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}