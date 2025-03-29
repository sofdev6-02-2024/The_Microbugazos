using Backend.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace Backend.Application.Handlers.Auth.Request.Queries
{
    public class GetUserByTokenQuery(string token) : IRequest<BaseResponse?>
    {
        public string Token { get; set; } = token;
    }
}
