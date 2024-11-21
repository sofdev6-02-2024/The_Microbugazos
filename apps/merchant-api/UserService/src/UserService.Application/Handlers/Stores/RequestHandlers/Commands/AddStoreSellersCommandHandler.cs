using MediatR;
using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Domain.Concretes;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Commands;

public class AddStoreSellersCommandHandler(IStoreRepository storeRepository, IUserRepository userRepository)
    : IRequestHandler<AddStoreSellersCommand, bool>
{
    public async Task<bool> Handle(AddStoreSellersCommand request, CancellationToken cancellationToken)
    {
        if (request.StoreId == Guid.Empty)
        {
            throw new ArgumentException("Store ID cannot be empty", nameof(request.StoreId));
        }

        User? user = null;

        if (request.SellerId.HasValue)
        {
            user = await userRepository.GetByIdAsync(request.SellerId.Value);
        }
        else if (!string.IsNullOrWhiteSpace(request.SellerEmail))
        {
            user = await userRepository.GetUserByEmailAsync(request.SellerEmail);
        }

        if (user == null)
        {
            throw new KeyNotFoundException($"User not found");
        }

        var store = await storeRepository.GetByIdAsync(request.StoreId);
        if (store == null)
        {
            throw new KeyNotFoundException($"Store with ID {request.StoreId} not found");
        }

        store.SellerIds ??= new List<Guid>();

        if (!store.SellerIds.Contains(user.Id))
        {
            store.SellerIds.Add(user.Id);
        }

        user.UserType = UserType.SELLER;

        await storeRepository.UpdateAsync(store);
        await userRepository.UpdateAsync(user);

        return true;
    }
}
