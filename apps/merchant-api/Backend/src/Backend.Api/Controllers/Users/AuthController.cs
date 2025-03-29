using Backend.Application.Dtos.Users;
using Backend.Application.Handlers.Auth.Request.Commands;
using Backend.Application.Handlers.Auth.Request.Queries;
using Backend.Commons.ResponseHandler.Responses.Concretes;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/users/[controller]")]
public class AuthController(IMediator mediator) : ControllerBase
{

    [HttpPost("signup")]
    public async Task<ActionResult> SignUp([FromBody] RegisterUserDto request)
    {
        var user = await mediator.Send(new UserRegisterCommand(request));
        if (user is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<Guid>)user;
        return StatusCode(successResponse.StatusCode, successResponse);
    }

    [HttpGet("token")]
    public async Task<ActionResult<UserDto?>> ValidateToken()
    {
        var authHeader = Request.Headers.Authorization.ToString();

        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized();
        
        var user = await mediator.Send(new GetUserByTokenQuery(authHeader));
        if (user is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<UserDto>)user!;
        return StatusCode(successResponse.StatusCode, successResponse);
    }
    
    [HttpPut]
    public async Task<ActionResult<UserDto?>> UpdateUser([FromBody] UpdateUserDto updateUserDto)
    {
        var authHeader = Request.Headers.Authorization.ToString();

        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized();

        var userResponse = await mediator.Send(new GetUserByTokenQuery(authHeader));
        if (userResponse is ErrorResponse userError)
            return StatusCode(userError.StatusCode, userError);
     
        var updateResponse = await mediator.Send(new UpdateUserCommand(updateUserDto));
        if (updateResponse is ErrorResponse updateError)
            return StatusCode(updateError.StatusCode, updateError);

        var successResponse = (SuccessResponse<UserDto>)updateResponse;
        return StatusCode(successResponse.StatusCode, successResponse);
    }
}
