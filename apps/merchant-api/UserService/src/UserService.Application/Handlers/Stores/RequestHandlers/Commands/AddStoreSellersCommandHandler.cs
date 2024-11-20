using MediatR;
using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Domain.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Commands;


public class AddStoreSellersCommandHandler(IStoreRepository storeRepository, IUserRepository userRepository)
    : IRequestHandler<AddStoreSellersCommand, bool>
{
    public async Task<bool> Handle(AddStoreSellersCommand request, CancellationToken cancellationToken)
    {
        var store = await storeRepository.GetByIdAsync(request.StoreId) 
                    ?? throw new Exception("Store not found");

        foreach (var sellerId in request.SellerIds)
        {
            var user = await userRepository.GetByIdAsync(sellerId);
            user.UserType = UserType.SELLER;
            if (user == null)
            {
                throw new Exception($"User with ID {sellerId} not found");
            }
        }

        foreach (var sellerId in request.SellerIds)
        {
            if (!store.SellerIds.Contains(sellerId))
            {
                store.SellerIds.Add(sellerId);
            }
        }

        await storeRepository.UpdateAsync(store);
        return true;
    }
}
