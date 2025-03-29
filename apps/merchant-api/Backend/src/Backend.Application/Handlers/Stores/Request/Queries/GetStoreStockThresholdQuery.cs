using Backend.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace Backend.Application.Handlers.Stores.Request.Queries;

public class GetStoreStockThresholdQuery(Guid storeId) : IRequest<BaseResponse>
{
    public Guid StoreId { get; set; } = storeId;
}
