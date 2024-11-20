using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using PaymentService.Application.Dtos.Orders;

namespace PaymentService.Application.QueryCommands.Orders.Commands.Commands;

public class CreateOrderCommand(CreateOrderDto createOrderDto) : IRequest<BaseResponse>
{
    public CreateOrderDto OrderToCreateDto { get; set; } = createOrderDto;
}