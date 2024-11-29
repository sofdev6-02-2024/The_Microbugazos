using AutoMapper;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Queries;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Queries;

public class GetStoreByUserIdQueryHandler(
    IStoreRepository storeRepository,
    IResponseHandlingHelper responseHandlingHelper,
    IMapper mapper) : IRequestHandler<GetStoreByUserIdQuery, BaseResponse?>
{
    public async Task<BaseResponse?> Handle(GetStoreByUserIdQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<Store> stores = await storeRepository.GetByAsync(store => store.UserId == request.Id);
        if (!stores.Any())
            return responseHandlingHelper.NotFound<StoreDto>(
                "The user has not any stores associated with this request.");
        
        return responseHandlingHelper.Ok("The store with the follow id" + request.Id + " was found", mapper.Map<StoreDto>(stores.First()));
    }
}