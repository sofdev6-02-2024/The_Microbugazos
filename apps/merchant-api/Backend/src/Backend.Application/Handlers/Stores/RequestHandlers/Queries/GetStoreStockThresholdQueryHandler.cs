using Backend.Application.Handlers.Stores.Request.Queries;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Infrastructure.Repositories.Interfaces;
using MediatR;

namespace Backend.Application.Handlers.Stores.RequestHandlers.Queries;

public class GetStoreStockThresholdQueryHandler(
    IStoreRepository storeRepository,
    IResponseHandlingHelper responseHandlingHelper) : IRequestHandler<GetStoreStockThresholdQuery, BaseResponse>
{

    public async Task<BaseResponse> Handle(GetStoreStockThresholdQuery request, CancellationToken cancellationToken)
    {
        var store = await storeRepository.GetByIdAsync(request.StoreId);
        if (store == null)
            return responseHandlingHelper.NotFound<int>("Store not found");

        return responseHandlingHelper.Ok("The store has the threshold: ", data: store.LowStockThreshold);
    }
}