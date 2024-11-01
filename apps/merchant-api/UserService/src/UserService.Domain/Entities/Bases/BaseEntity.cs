using UserService.Domain.Entities.Interfaces;

namespace UserService.Domain.Entities.Bases;

public abstract class BaseEntity : BaseRegister, IEntity
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public bool IsActive { get; set; } = true;
}
