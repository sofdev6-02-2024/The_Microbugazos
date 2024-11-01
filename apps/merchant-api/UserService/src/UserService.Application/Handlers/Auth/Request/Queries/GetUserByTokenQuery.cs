using MediatR;
using UserService.Domain.Entities.Concretes;

namespace UserService.Application.Handlers.Auth.Request.Queries
{
    public class GetUserByTokenQuery(string token) : IRequest<User?>
    {
        public string Token { get; set; } = token;
    }
}
