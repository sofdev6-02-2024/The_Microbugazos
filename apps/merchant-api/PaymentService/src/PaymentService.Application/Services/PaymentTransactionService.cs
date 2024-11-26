using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using Commons.ResponseHandler.Responses.Concretes;
using PaymentService.Application.Dtos.PaymentTransactions;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Repositories.Interfaces;

namespace PaymentService.Application.Services;

public class PaymentTransactionService(
    IResponseHandlingHelper responseHandlingHelper,
    IRepository<Order> orderRepository,
    IRepository<PaymentMethod> paymentMethodRepository,
    IRepository<PaymentTransaction> paymentTransactionRepository
)
{
    public async Task<BaseResponse> CreatePaymentTransaction(CreatePaymentTransactionDto paymentTransactionDto)
    {
        var order = await orderRepository.GetByIdAsync(paymentTransactionDto.OrderId);
        if (order == null)
            return responseHandlingHelper.NotFound<Order>(
                $"Order with the id {paymentTransactionDto.OrderId} was not found.");

        var paymentMethod = await paymentMethodRepository.GetByIdAsync(paymentTransactionDto.PaymentMethodId);
        if (paymentMethod == null)
            return responseHandlingHelper.NotFound<PaymentMethod>(
                $"Payment Method with the id {paymentTransactionDto.PaymentMethodId} was not found.");

        var paymentTransaction = new PaymentTransaction
        {
            OrderId = paymentTransactionDto.OrderId,
            PaymentMethodId = paymentTransactionDto.PaymentMethodId,
            Amount = paymentTransactionDto.Amount,
            TransactionOrderStatus = paymentTransactionDto.TransactionOrderStatus,
        };

        await paymentTransactionRepository.AddAsync(paymentTransaction);

        return responseHandlingHelper.Created(
            "Payment Transaction has been successfully created.", paymentTransaction.Id);
    }
}