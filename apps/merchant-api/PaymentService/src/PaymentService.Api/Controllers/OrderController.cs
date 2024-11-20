using Commons.ResponseHandler.Responses.Concretes;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PaymentService.Application.Dtos;
using PaymentService.Application.Dtos.Orders;
using PaymentService.Application.QueryCommands.Orders.Commands.Commands;
using PaymentService.Application.QueryCommands.Orders.Queries.Queries;

namespace PaymentService.Api.Controllers;

[ApiController]
[Route("api/payment/[controller]")]
public class OrderController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateOrderDto request)
    {
        var result = await mediator.Send(new CreateOrderCommand(request));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<Guid>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }
    
    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetAll(int page = 1, int pageSize = 10)
    {
        var result = await mediator.Send(new GetAllOrdersQuery(page, pageSize));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        
        var successResponse = (SuccessResponse<PaginatedResponseDto<OrderDto>>)result;
        return StatusCode(successResponse.StatusCode, successResponse);      
    }
}