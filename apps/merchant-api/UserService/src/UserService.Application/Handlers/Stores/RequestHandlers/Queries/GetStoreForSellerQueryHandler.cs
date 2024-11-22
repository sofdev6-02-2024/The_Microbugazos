using AutoMapper;
using MediatR;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Queries;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Queries;

public class GetStoreForSellerQueryHandler(IStoreRepository storeRepository, IMapper mapper)
    : IRequestHandler<GetStoreForSellerQuery, StoreDto?>
{
    public async Task<StoreDto?> Handle(GetStoreForSellerQuery request, CancellationToken cancellationToken)
    {
        var store = await storeRepository.GetStoreForSellerAsync(request.SellerId);
        return mapper.Map<StoreDto>(store);
    }
}
