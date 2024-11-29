using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace UserService.Application.Handlers.Stores.Request.Queries;

public class GetStoreSellersQuery(Guid storeId) : IRequest<List<BaseResponse>>
{
    public Guid StoreId { get; set; } = storeId;
}
