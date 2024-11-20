using PaymentService.Domain.Entities.Interfaces;

namespace PaymentService.Domain.Entities.Bases;

public abstract class BaseEntity : BaseRegister, IEntity
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public bool IsActive { get; set; } = true;
}
