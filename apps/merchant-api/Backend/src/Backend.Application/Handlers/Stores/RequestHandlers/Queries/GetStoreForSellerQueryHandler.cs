using AutoMapper;
using Backend.Application.Dtos.Stores;
using Backend.Application.Handlers.Stores.Request.Queries;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Infrastructure.Repositories.Interfaces;
using MediatR;

namespace Backend.Application.Handlers.Stores.RequestHandlers.Queries;

public class GetStoreForSellerQueryHandler(
    IStoreRepository storeRepository, 
    IResponseHandlingHelper responseHandlingHelper,
    IMapper mapper)
    : IRequestHandler<GetStoreForSellerQuery, BaseResponse?>
{
    public async Task<BaseResponse?> Handle(GetStoreForSellerQuery request, CancellationToken cancellationToken)
    {
        var store = await storeRepository.GetStoreForSellerAsync(request.SellerId);
        if (store == null)
            return responseHandlingHelper.NotFound<StoreDto>("Any Store was found");
        
        return responseHandlingHelper.Ok("The store associate withe the seller was found", mapper.Map<StoreDto>(store));
    }
}
