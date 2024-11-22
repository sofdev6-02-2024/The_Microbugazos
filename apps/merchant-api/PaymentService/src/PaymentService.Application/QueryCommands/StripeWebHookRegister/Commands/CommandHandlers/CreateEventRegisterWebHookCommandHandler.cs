using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using Commons.ResponseHandler.Responses.Concretes;
using DotNetEnv;
using MediatR;
using PaymentService.Application.Dtos.Orders;
using PaymentService.Application.Dtos.PaymentTransactions;
using PaymentService.Application.QueryCommands.StripeWebHookRegister.Commands.Commands;
using PaymentService.Application.Services;
using PaymentService.Domain.Entities.Enums;
using PaymentService.Infrastructure.Repositories.Interfaces;
using Stripe;
using Stripe.Checkout;
using PaymentMethod = PaymentService.Domain.Entities.Concretes.PaymentMethod;

namespace PaymentService.Application.QueryCommands.StripeWebHookRegister.Commands.CommandHandlers;

public class CreateEventRegisterWebHookCommandHandler : IRequestHandler<CreateEventRegisterWebHookCommand, BaseResponse>
{
    private readonly IRepository<PaymentMethod> _paymentMethodRepository;
    private readonly IResponseHandlingHelper _responseHandlingHelper;
    private readonly PaymentTransactionService _transactionService;
    private readonly OrderService _orderService;

    public CreateEventRegisterWebHookCommandHandler(
        IRepository<PaymentMethod> paymentMethodRepository,
        PaymentTransactionService paymentTransactionService,
        PaymentTransactionService transactionService, OrderService orderService, 
        IResponseHandlingHelper responseHandlingHelper)
    {
        _paymentMethodRepository = paymentMethodRepository;
        _transactionService = transactionService;
        _orderService = orderService;
        _responseHandlingHelper = responseHandlingHelper;
        StripeConfiguration.ApiKey = Env.GetString("STRIPE_SECRET_KEY");
    }

    public async Task<BaseResponse> Handle(CreateEventRegisterWebHookCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var stripeEvent = EventUtility.ParseEvent(request.RequestBody);

            if (stripeEvent.Type != EventTypes.CheckoutSessionCompleted) 
                return _responseHandlingHelper.Ok("The stripe event was processed", stripeEvent.Id);
            
            if (stripeEvent.Data.Object is not Session session) 
                return _responseHandlingHelper.InternalServerError<Session>("Session was not found");

            var fullSession = await GetFullSession(session.Id, cancellationToken);
            
            var orderResponse = await ProcessOrder(fullSession);
            if (orderResponse is ErrorResponse errorOrderResponse) return errorOrderResponse;

            var transactionResponse = await ProcessPaymentTransaction(session, (SuccessResponse<Guid>)orderResponse);
            if (transactionResponse is ErrorResponse errorTransactionResponse) return errorTransactionResponse;

            return _responseHandlingHelper.Ok("The stripe event was processed", stripeEvent.Id);
        }
        catch (StripeException e)
        {
            return _responseHandlingHelper.InternalServerError<StripeException>(e.Message);
        }
    }
    
    private async Task<Session> GetFullSession(string sessionId, CancellationToken cancellationToken)
    {
        var sessionService = new SessionService();
        return await sessionService.GetAsync(sessionId, new SessionGetOptions
        {
            Expand = ["line_items", "line_items.data.price.product"]
        }, cancellationToken: cancellationToken);
    }
    
    private async Task<BaseResponse> ProcessOrder(Session session)
    {
        var orderDto = new CreateOrderDto
        {
            UserId = new Guid(session.Metadata["user_id"]),
            OrderStatus = OrderStatus.Pending,
            Items = CreateOrderItems(session)
        };

        return await _orderService.CreateOrder(orderDto);
    }

    private List<CreateOrderItemDto> CreateOrderItems(Session session)
    {
        var orderItems = new List<CreateOrderItemDto>();

        if (session.LineItems == null) return orderItems;

        foreach (var lineItem in session.LineItems.Data)
        {
            var productVariantId = lineItem.Price.Product.Metadata.GetValueOrDefault("product_variant_id");
            var currentOrderItem = new CreateOrderItemDto
            {
                ProductVariantId = new Guid(productVariantId),
                Quantity = (int)lineItem.Quantity,
                DiscountPercent = 0
            };
            orderItems.Add(currentOrderItem);
        }

        return orderItems;
    }

    private async Task<BaseResponse> ProcessPaymentTransaction(Session session, SuccessResponse<Guid> orderResponse)
    {
        var paymentMethod = await _paymentMethodRepository.FindAsync(p => 
            p.Name == session.PaymentMethodTypes[0]);
            
        var paymentTransactionDto = new CreatePaymentTransactionDto
        {
            PaymentMethodId = paymentMethod.First().Id,
            Amount = (double)session.AmountTotal / 100,
            OrderId = orderResponse.Data
        };

        return await _transactionService.CreatePaymentTransaction(paymentTransactionDto);
    }
}