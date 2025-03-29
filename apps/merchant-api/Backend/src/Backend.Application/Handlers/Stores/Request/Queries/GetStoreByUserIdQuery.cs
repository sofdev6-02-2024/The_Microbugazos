using Backend.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace Backend.Application.Handlers.Stores.Request.Queries;

public class GetStoreByUserIdQuery(Guid id) : IRequest<BaseResponse?>
{
    public Guid Id { get; set; } = id;
}
