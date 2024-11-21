using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using MediatR;
using PaymentService.Application.Dtos.Orders;
using PaymentService.Application.Dtos.PaymentTransactions;
using PaymentService.Application.QueryCommands.PaymentTransactions.Commands.Commands;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Repositories.Interfaces;

namespace PaymentService.Application.QueryCommands.PaymentTransactions.Commands.CommandHandlers;

public class CreatePaymentTransactionCommandHandler(
    IValidator<CreatePaymentTransactionDto> validator,
    IResponseHandlingHelper responseHandlingHelper,
    IRepository<Order> orderRepository,
    IRepository<PaymentMethod> paymentMethodRepository,
    IRepository<PaymentTransaction> paymentTransactionRepository
    ) : IRequestHandler<CreatePaymentTransactionCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(CreatePaymentTransactionCommand request, CancellationToken cancellationToken)
    {
        var paymentTransactionDto = request.PaymentTransaction;
        var response = await validator.ValidateAsync(paymentTransactionDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<CreateOrderDto>(
            "The operation to create a payment transaction was not completed, please check the errors.", 
            response.Errors.Select(e => e.ErrorMessage).ToList());
        
        var order = await orderRepository.GetByIdAsync(paymentTransactionDto.OrderId);
        var paymentMethod = await paymentMethodRepository.GetByIdAsync(paymentTransactionDto.PaymentMethodId);

        if (order == null)
            return responseHandlingHelper.NotFound<Order>("Order with the follow id " + paymentTransactionDto.OrderId + " was not found");

        if (paymentMethod == null)
            return responseHandlingHelper.NotFound<PaymentMethod>("Payment Method with the follow id " + paymentTransactionDto.PaymentMethodId + " was not found");

        var paymentTransaction = new PaymentTransaction
        {
            OrderId = paymentTransactionDto.OrderId,
            PaymentMethodId = paymentTransactionDto.PaymentMethodId,
            Amount = paymentTransactionDto.Amount,
            TransactionOrderStatus = paymentTransactionDto.TransactionOrderStatus,
        };

        await paymentTransactionRepository.AddAsync(paymentTransaction);
        return responseHandlingHelper.Created("Payment Transaction has been successfully created.", paymentTransaction.Id);
    }
}