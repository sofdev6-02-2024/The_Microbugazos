using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace PaymentService.Application.QueryCommands.PaymentTransactions.Queries.Queries;

public class GetAllPaymentTransactionsQuery(int page, int pageSize) : IRequest<BaseResponse>
{
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
}