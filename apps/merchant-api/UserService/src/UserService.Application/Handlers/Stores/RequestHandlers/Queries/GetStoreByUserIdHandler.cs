using AutoMapper;
using MediatR;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Queries;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Queries;

public class GetStoreByUserIdQueryHandler(IStoreRepository storeRepository, IMapper mapper) : IRequestHandler<GetStoreByUserIdQuery, StoreDto?>
{
    public async Task<StoreDto?> Handle(GetStoreByUserIdQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<Store> stores = await storeRepository.GetByAsync(store => store.UserId == request.Id);
        if (!stores.Any())
        {
            return null;
        }
        return mapper.Map<StoreDto>(stores.First());
    }
}