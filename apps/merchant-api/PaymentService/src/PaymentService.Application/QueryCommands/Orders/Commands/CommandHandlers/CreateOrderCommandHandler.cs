using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using MediatR;
using PaymentService.Application.Dtos.Orders;
using PaymentService.Application.QueryCommands.Orders.Commands.Commands;
using PaymentService.Application.Services;

namespace PaymentService.Application.QueryCommands.Orders.Commands.CommandHandlers;

public class CreateOrderCommandHandler(
    IResponseHandlingHelper responseHandlingHelper,
    IValidator<CreateOrderDto> validator,
    OrderService orderService
    ) : IRequestHandler<CreateOrderCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var orderDto = request.OrderToCreateDto;
        var response = await validator.ValidateAsync(orderDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<CreateOrderDto>(
            "The operation to create an order was not completed, please check the errors.", 
            response.Errors.Select(e => e.ErrorMessage).ToList());

        return await orderService.CreateOrder(orderDto);
    }
}