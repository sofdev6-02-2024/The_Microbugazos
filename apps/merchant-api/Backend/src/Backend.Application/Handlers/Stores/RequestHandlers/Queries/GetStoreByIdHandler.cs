using AutoMapper;
using Backend.Application.Dtos.Stores;
using Backend.Application.Handlers.Stores.Request.Queries;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Domain.Entities.Concretes;
using Backend.Infrastructure.Repositories.Interfaces;
using MediatR;

namespace Backend.Application.Handlers.Stores.RequestHandlers.Queries;

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