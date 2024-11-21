using MediatR;
using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Domain.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Commands;

public class DeleteStoreSellersCommandHandler(IStoreRepository storeRepository, IUserRepository userRepository)
    : IRequestHandler<DeleteStoreSellersCommand, bool>
{
    public async Task<bool> Handle(DeleteStoreSellersCommand request, CancellationToken cancellationToken)
    {
        var store = await storeRepository.GetByIdAsync(request.StoreId) 
                    ?? throw new Exception("Store not found");

        foreach (var sellerId in request.SellerIds)
        {
            var user = await userRepository.GetByIdAsync(sellerId)
                       ?? throw new Exception($"User with ID {sellerId} not found");

            store.SellerIds.Remove(sellerId);

            user.UserType = UserType.CLIENT;

            await userRepository.UpdateAsync(user);
        }

        await storeRepository.UpdateAsync(store);

        return true;
    }
}