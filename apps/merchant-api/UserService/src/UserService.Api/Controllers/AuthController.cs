
using AutoMapper;
using Commons.ResponseHandler.Responses.Concretes;
using UserService.Application.Dtos.Users;
using UserService.Application.Handlers.Auth.Request.Commands;
using UserService.Domain.Entities.Concretes;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using UserService.Application.Handlers.Auth.Request.Queries;

namespace UserService.Api.Controllers;

[ApiController]
[Route("api/users/[controller]")]
public class AuthController(IMediator mediator, IMapper mapper) : ControllerBase
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

        var currentUser = ((SuccessResponse<UserDto>)userResponse!).Data;

        var updateUserCommand = new UpdateUserCommand
        {
            Id = currentUser!.Id,
            Name = updateUserDto.Name,
            Email = updateUserDto.Email
        };
        var updateResponse = await mediator.Send(updateUserCommand);
        if (updateResponse is ErrorResponse updateError)
            return StatusCode(updateError.StatusCode, updateError);

        var successResponse = (SuccessResponse<UserDto>)updateResponse;
        return StatusCode(successResponse.StatusCode, successResponse);
    }
}
