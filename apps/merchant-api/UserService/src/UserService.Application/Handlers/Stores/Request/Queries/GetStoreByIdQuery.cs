using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace UserService.Application.Handlers.Stores.Request.Queries;

public class GetStoreByIdQuery(Guid id) : IRequest<BaseResponse?>
{
    public Guid Id { get; set; } = id;
}
