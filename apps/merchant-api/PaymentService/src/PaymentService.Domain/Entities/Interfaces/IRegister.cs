namespace PaymentService.Domain.Entities.Interfaces;

public interface IRegister
{
    public DateTime CreatedAt { get; }
    public DateTime? UpdatedAt { get; set; }
}
