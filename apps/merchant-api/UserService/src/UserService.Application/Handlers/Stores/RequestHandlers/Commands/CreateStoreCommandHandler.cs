using AutoMapper;
using MediatR;
using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Domain.Concretes;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Commands;


public class CreateStoreCommandHandler(IStoreRepository storeRepository, IUserRepository userRepository, IMapper mapper) : IRequestHandler<CreateStoreCommand, Guid>
{

    public async Task<Guid> Handle(CreateStoreCommand request, CancellationToken cancellationToken)
    {
        var store = mapper.Map<Store>(request.StoreDto);
        var user = await userRepository.GetByIdAsync(store.UserId) ?? throw new Exception("User not found");

        var storeExist = await storeRepository.GetByAsync((x) => x.UserId == store.UserId);

        if (storeExist.Count() > 0)
        {
            throw new Exception("User already has a store");
        }

        store = await storeRepository.AddAsync(store);
        user.UserType = UserType.ADMIN;
        await userRepository.UpdateAsync(user);
        return store.Id;
    }
}