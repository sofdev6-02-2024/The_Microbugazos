using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Dtos.Auth;
using UserService.Application.Dtos.Users;
using UserService.Application.Handlers.Auth.Request.Queries;
using UserService.Application.Services.Auth.Interfaces;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Auth.RequestHandlers.Queries;

public class GetUserByTokenQueryHandler(
    IJwtDecoder jwtDecoder, 
    IUserRepository userRepository,
    IResponseHandlingHelper responseHandlingHelper) : IRequestHandler<GetUserByTokenQuery, BaseResponse?>
{
    public async Task<BaseResponse?> Handle(GetUserByTokenQuery request, CancellationToken cancellationToken)
    {
        request.Token = request.Token["Bearer ".Length..].Trim();

        AuthToken? authToken = await jwtDecoder.DecodeJwtToken(request.Token);

        if (authToken == null)
        {
            return responseHandlingHelper.NotFound<UserDto>(
                "The token could not be processed.");
        }

        var result = await userRepository.GetByAsync(user => user.Email == authToken.Email);

        var user = result.FirstOrDefault();
        if (user == null)
        {
            return responseHandlingHelper.NotFound<UserDto>(
                "User not found.");
        }

        var userDto = new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            UserType = user.UserType,
        };

        return responseHandlingHelper.Ok("The user with the follow id " + user.Id + " was found", userDto);
    }

}
