using PaymentService.Domain.Entities.Enums;

namespace PaymentService.Application.Dtos.Orders;

public class CreateOrderDto
{
    public Guid UserId { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public List<CreateOrderItemDto> Items { get; set; } = [];
}