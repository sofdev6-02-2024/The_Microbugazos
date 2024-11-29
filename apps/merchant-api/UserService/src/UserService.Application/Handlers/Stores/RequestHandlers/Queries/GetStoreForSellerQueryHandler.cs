using AutoMapper;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Queries;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Queries;

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
