using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using MediatR;
using PaymentService.Application.Dtos.PaymentTransactions;
using PaymentService.Application.QueryCommands.PaymentTransactions.Commands.Commands;
using PaymentService.Application.Services;

namespace PaymentService.Application.QueryCommands.PaymentTransactions.Commands.CommandHandlers;

public class CreatePaymentTransactionCommandHandler(
    IValidator<CreatePaymentTransactionDto> validator,
    IResponseHandlingHelper responseHandlingHelper,
    PaymentTransactionService paymentTransactionService
    ) : IRequestHandler<CreatePaymentTransactionCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(CreatePaymentTransactionCommand request, CancellationToken cancellationToken)
    {
        var paymentTransactionDto = request.PaymentTransaction;
        var response = await validator.ValidateAsync(paymentTransactionDto, cancellationToken);
        if (!response.IsValid) 
            return responseHandlingHelper.BadRequest<CreatePaymentTransactionDto>(
                "The operation to create a payment transaction was not completed. Please check the errors.",
                response.Errors.Select(e => e.ErrorMessage).ToList()
            );
        
        return await paymentTransactionService.CreatePaymentTransaction(paymentTransactionDto);
    }
}