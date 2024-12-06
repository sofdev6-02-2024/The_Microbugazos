using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Handlers.Stores.Request.Queries;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Queries;

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