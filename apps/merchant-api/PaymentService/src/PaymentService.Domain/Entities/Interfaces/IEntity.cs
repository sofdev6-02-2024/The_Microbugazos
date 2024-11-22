namespace PaymentService.Domain.Entities.Interfaces;

public interface IEntity : IRegister
{
    public Guid Id { get; }
    public bool IsActive { get; set; }
}
