using MediatR;
using UserService.Application.Dtos.Auth;
using UserService.Application.Handlers.Auth.Request.Queries;
using UserService.Application.Services.Auth.Interfaces;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Auth.RequestHandlers.Queries;

public class GetUserByTokenQueryHandler(IJwtDecoder jwtDecoder, IUserRepository userRepository) : IRequestHandler<GetUserByTokenQuery, User?>
{
    public async Task<User?> Handle(GetUserByTokenQuery request, CancellationToken cancellationToken)
    {
        request.Token = request.Token["Bearer ".Length..].Trim();

        AuthToken? authToken = await jwtDecoder.DecodeJwtToken(request.Token);

        if (authToken == null)
        {
            throw new Exception("The token could not be processed.");
        }

        var result = await userRepository.GetByAsync(user => user.Email == authToken.Email);

        return result.FirstOrDefault();
    }
}
