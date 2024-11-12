
using AutoMapper;
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
    private readonly IMediator _mediator = mediator;
    private readonly IMapper _mapper = mapper;

    [HttpPost("signup")]
    public async Task<ActionResult<UserDto>> SignUp(UserRegisterCommand userRegisterCommand)
    {
        User user = await _mediator.Send(userRegisterCommand);
        return Ok(_mapper.Map<UserDto>(user));
    }

    [HttpGet("token")]
    public async Task<ActionResult<UserDto?>> ValidateToken()
    {
        var authHeader = Request.Headers.Authorization.ToString();

        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        {
            return await Task.FromResult<ActionResult<UserDto?>>(Unauthorized());
        }
        User? user = await _mediator.Send(new GetUserByTokenQuery(authHeader));
        if (user == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<UserDto>(user));
    }
}
