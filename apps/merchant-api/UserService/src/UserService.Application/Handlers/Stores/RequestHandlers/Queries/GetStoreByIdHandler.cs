using AutoMapper;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Queries;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Queries;

public class GetStoreByIdQueryHandler(
    IStoreRepository storeRepository, IMapper mapper,
    IResponseHandlingHelper responseHandlingHelper
    ) : IRequestHandler<GetStoreByIdQuery, BaseResponse?>
{
    public async Task<BaseResponse?> Handle(GetStoreByIdQuery request, CancellationToken cancellationToken)
    {
        Store? store = await storeRepository.GetByIdAsync(request.Id);
        if (store == null)
            return responseHandlingHelper.NotFound<StoreDto>(
                "The store with the follow id" + request.Id + " was not found");
        return responseHandlingHelper.Ok("The store with the follow id" + request.Id + " was found", mapper.Map<StoreDto>(store));
    }
}