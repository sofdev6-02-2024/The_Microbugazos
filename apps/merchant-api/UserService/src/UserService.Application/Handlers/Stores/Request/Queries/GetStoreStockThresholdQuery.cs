using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace UserService.Application.Handlers.Stores.Request.Queries;

public class GetStoreStockThresholdQuery(Guid storeId) : IRequest<BaseResponse>
{
    public Guid StoreId { get; set; } = storeId;
}
