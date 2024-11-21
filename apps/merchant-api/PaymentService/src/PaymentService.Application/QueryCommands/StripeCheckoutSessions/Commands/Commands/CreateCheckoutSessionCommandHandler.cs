using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using DotNetEnv;
using MediatR;
using PaymentService.Application.QueryCommands.StripeCheckoutSessions.Commands.CommandHandlers;
using Stripe;
using Stripe.Checkout;

namespace PaymentService.Application.QueryCommands.StripeCheckoutSessions.Commands.Commands;

public class CreateCheckoutSessionCommandHandler : IRequestHandler<CreateCheckoutSessionCommand, BaseResponse>
{
    private readonly IResponseHandlingHelper _responseHandlingHelper;
    
    public CreateCheckoutSessionCommandHandler(IResponseHandlingHelper responseHandlingHelper)
    {
        Env.Load("../../../../../.env");
        StripeConfiguration.ApiKey = Env.GetString("STRIPE_SECRET_KEY") ?? 
                                     Environment.GetEnvironmentVariable("STRIPE_SECRET_KEY") ?? throw new Exception("STRIPE_SECRET_KEY is not set");
        _responseHandlingHelper = responseHandlingHelper;
    }

    public async Task<BaseResponse> Handle(CreateCheckoutSessionCommand request, CancellationToken cancellationToken)
    {
        var lineItems = request.ShoppingCartList.Select(product =>
            new SessionLineItemOptions {
                PriceData = new SessionLineItemPriceDataOptions
                {
                    Currency = "usd",
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = product.Name,
                        Images = [product.ImageUrl]
                    }, UnitAmount = (long)(product.Price * 100),
                },
                Quantity = product.Quantity,
            }).ToList();

        var options = new SessionCreateOptions
        {
            PaymentMethodTypes = ["card"],
            LineItems = lineItems,
            Mode = "payment",
            SuccessUrl = "http://localhost:3000/payment_transaction/success",
            CancelUrl = "http://localhost:3000/payment_transaction/failed",
            CustomerEmail = request.Customer.Email,
            Metadata = new Dictionary<string, string>
            {
                { "user_id", request.Customer.UserId.ToString() }
            }
        };
        
        var service = new SessionService();
        var session = await service.CreateAsync(options, cancellationToken: cancellationToken);
        return _responseHandlingHelper.Ok("The checkout session was successfully created.", session.Id);
    }
}
