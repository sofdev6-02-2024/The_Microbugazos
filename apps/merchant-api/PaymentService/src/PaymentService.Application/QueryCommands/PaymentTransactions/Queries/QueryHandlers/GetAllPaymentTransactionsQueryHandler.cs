using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using PaymentService.Application.Dtos;
using PaymentService.Application.Dtos.PaymentTransactions;
using PaymentService.Application.QueryCommands.PaymentTransactions.Queries.Queries;
using PaymentService.Application.Services.EnumsConverters;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Repositories.Interfaces;

namespace PaymentService.Application.QueryCommands.PaymentTransactions.Queries.QueryHandlers;

public class GetAllPaymentTransactionsQueryHandler(
    IResponseHandlingHelper responseHandlingHelper,
    IRepository<PaymentTransaction> paymentTransactionRepository
    ) : IRequestHandler<GetAllPaymentTransactionsQuery, BaseResponse> 
{
    public async Task<BaseResponse> Handle(GetAllPaymentTransactionsQuery request, CancellationToken cancellationToken)
    {
        var totalPaymentTransactions = await paymentTransactionRepository.GetAllAsync(request.Page, request.PageSize);
        var converter = new PaymentStatusConverterService();
        List<PaymentTransactionDto> totalPaymentTransactionsDtos = [];
        
        foreach (var paymentTransaction in totalPaymentTransactions)
        {
            var paymentTransactionDto = new PaymentTransactionDto
            {
                PaymentTransactionId = paymentTransaction.Id,
                OrderId = paymentTransaction.OrderId,
                Amount = paymentTransaction.Amount,
                TransactionOrderStatus = converter.ConvertPaymentStatusToString(paymentTransaction.TransactionOrderStatus),
                PaymentMethod = new PaymentMethodDto
                {
                    PaymentMethodId = paymentTransaction.PaymentMethod.Id,
                    Name = paymentTransaction.PaymentMethod.Name
                }
            };
            totalPaymentTransactionsDtos.Add(paymentTransactionDto);
        }
        
        var paymentTransactionsToDisplay = new PaginatedResponseDto<PaymentTransactionDto>
        {
            Items = totalPaymentTransactionsDtos, 
            TotalCount = totalPaymentTransactionsDtos.Count, 
            Page = request.Page, 
            PageSize = request.PageSize
        };
        return responseHandlingHelper.Ok("Payment Transactions have been successfully obtained.", paymentTransactionsToDisplay);
    }
}