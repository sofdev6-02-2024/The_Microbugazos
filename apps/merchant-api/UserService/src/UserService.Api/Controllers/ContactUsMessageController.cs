using Commons.ResponseHandler.Responses.Concretes;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using UserService.Application.Dtos.ContactUsMessages;
using UserService.Application.Handlers.ContactUsMessages.Request.Commands;
using UserService.Application.Handlers.ContactUsMessages.Request.Queries;

namespace UserService.Api.Controllers;

[ApiController]
[Route("api/users/[controller]")]
public class ContactUsMessageController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateContactUsMessageDto request)
    {
        var result = await mediator.Send(new CreateContactUsMessageCommand(request));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        
        var successResponse = (SuccessResponse<Guid>)result;
        return StatusCode(successResponse.StatusCode, successResponse);   
    }
    
    [HttpGet]
    public async Task<ActionResult<List<ContactUsMessageDto>>> GetAll()
    {
        var result = await mediator.Send(new GetAllContactUsMessagesQuery());
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        
        var successResponse = (SuccessResponse<List<ContactUsMessageDto>>)result;
        return StatusCode(successResponse.StatusCode, successResponse);      
    }
}