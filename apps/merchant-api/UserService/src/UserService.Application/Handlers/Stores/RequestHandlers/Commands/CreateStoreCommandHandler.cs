using AutoMapper;
using MediatR;
using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Commands;


public class CreateStoreCommandHandler(IStoreRepository storeRepository, IUserRepository userRepository, IMapper mapper) : IRequestHandler<CreateStoreCommand, Guid>
{

    public async Task<Guid> Handle(CreateStoreCommand request, CancellationToken cancellationToken)
    {
        var identityId = request.StoreDto.UserIdentity;
        var store = mapper.Map<Store>(request.StoreDto);

        var user = await userRepository.GetUserByIdentityId(identityId ?? "") ?? throw new Exception("User not found");

        var storeExist = await storeRepository.GetByAsync((x) => x.UserId == user.Id);

        if (storeExist.Count() > 0)
        {
            throw new Exception("User already has a store");
        }
        
        store.UserId = user.Id;
        store = await storeRepository.AddAsync(store);
        return store.Id;
    }
}