using AutoMapper;
using MediatR;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Commands;


public class UpdateStoreCommandHandler(IStoreRepository storeRepository, IMapper mapper) : IRequestHandler<UpdateStoreCommand, StoreDto>
{

    public async Task<StoreDto> Handle(UpdateStoreCommand request, CancellationToken cancellationToken)
    {
        var currentStore = await storeRepository.GetByIdAsync(request.Id) ?? throw new Exception("Store not found");
        var store = mapper.Map<Store>(request.StoreDto);
        store.UserId = currentStore.UserId;
        store = await storeRepository.UpdateAsync(store);
        return mapper.Map<StoreDto>(store);
    }
}