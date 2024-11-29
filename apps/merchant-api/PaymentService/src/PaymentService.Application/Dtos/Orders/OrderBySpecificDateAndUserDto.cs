namespace PaymentService.Application.Dtos.Orders;

public class OrderBySpecificDateAndUserDto
{
    public Guid UserId { get; set; }
    public DateTime Date { get; set; }
}