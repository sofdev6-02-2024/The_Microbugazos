using AutoMapper;
using MediatR;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Queries;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Queries;

public class GetStoreByIdQueryHandler(IStoreRepository storeRepository, IMapper mapper) : IRequestHandler<GetStoreByIdQuery, StoreDto?>
{
    public async Task<StoreDto?> Handle(GetStoreByIdQuery request, CancellationToken cancellationToken)
    {
        Store? store = await storeRepository.GetByIdAsync(request.Id);
        return mapper.Map<StoreDto>(store);
    }
}