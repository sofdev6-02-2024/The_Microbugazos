namespace UserService.Domain.Interfaces;

public interface IEntity : IRegister
{
    Guid Id { get; }
    bool IsActive { get; set; }
}
