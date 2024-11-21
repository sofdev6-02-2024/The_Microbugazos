using Commons.ResponseHandler.Responses.Concretes;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PaymentService.Application.Dtos;
using PaymentService.Application.Dtos.PaymentTransactions;
using PaymentService.Application.QueryCommands.PaymentTransactions.Commands.Commands;
using PaymentService.Application.QueryCommands.PaymentTransactions.Queries.Queries;

namespace PaymentService.Api.Controllers;

[ApiController]
[Route("api/payment/[controller]")]
public class PaymentTransactionController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreatePaymentTransactionDto request)
    {
        var result = await mediator.Send(new CreatePaymentTransactionCommand(request));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<Guid>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }
    
    [HttpGet]
    public async Task<ActionResult<List<PaymentTransactionDto>>> GetAll(int page = 1, int pageSize = 10)
    {
        var result = await mediator.Send(new GetAllPaymentTransactionsQuery(page, pageSize));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        
        var successResponse = (SuccessResponse<PaginatedResponseDto<PaymentTransactionDto>>)result;
        return StatusCode(successResponse.StatusCode, successResponse);      
    }
}