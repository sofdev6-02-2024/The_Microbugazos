using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using PaymentService.Application.Dtos.PaymentTransactions;

namespace PaymentService.Application.QueryCommands.PaymentTransactions.Commands.Commands;

public class CreatePaymentTransactionCommand(CreatePaymentTransactionDto paymentTransactionDto) : IRequest<BaseResponse>
{
    public CreatePaymentTransactionDto PaymentTransaction { get; set; } = paymentTransactionDto;
}