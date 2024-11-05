using AutoMapper;
using MediatR;
using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Commands;


public class CreateStoreCommandHandler(IStoreRepository storeRepository, IMapper mapper) : IRequestHandler<CreateStoreCommand, Guid>
{

    public async Task<Guid> Handle(CreateStoreCommand request, CancellationToken cancellationToken)
    {
        var store = mapper.Map<Store>(request.StoreDto);

        var storeExist = await storeRepository.GetByAsync((x) => x.UserId == store.UserId);
        if (storeExist != null){
            throw new Exception("User already has a store");
        }
        store = await storeRepository.AddAsync(store);
        return store.Id;
    }
}