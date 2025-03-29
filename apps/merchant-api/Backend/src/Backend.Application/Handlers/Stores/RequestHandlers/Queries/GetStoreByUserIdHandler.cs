using AutoMapper;
using Backend.Application.Dtos.Stores;
using Backend.Application.Handlers.Stores.Request.Queries;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Domain.Entities.Concretes;
using Backend.Infrastructure.Repositories.Interfaces;
using MediatR;

namespace Backend.Application.Handlers.Stores.RequestHandlers.Queries;

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