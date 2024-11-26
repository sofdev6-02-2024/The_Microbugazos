using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using PaymentService.Application.Dtos.CheckoutSessions;

namespace PaymentService.Application.QueryCommands.StripeCheckoutSessions.Commands.CommandHandlers;

public class CreateCheckoutSessionCommand(CheckoutSessionRequestDto checkoutSessionRequestDto) : IRequest<BaseResponse>
{
    public List<ShoppingCartItemDto> ShoppingCartList { get; set; } = checkoutSessionRequestDto.ShoppingCartItems;
    public CustomerDTO Customer { get; set; } = checkoutSessionRequestDto.Customer;
}
