using MassTransit;
using MediatR;
using NotificationService.Domain.Dtos;
using NotificationService.Domain.Dtos.Emails;
using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Domain.Concretes;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Commands;

public class AddStoreSellersCommandHandler(IStoreRepository storeRepository, IUserRepository userRepository, IBus producer)
    : IRequestHandler<AddStoreSellersCommand, bool>
{
    public async Task<bool> Handle(AddStoreSellersCommand request, CancellationToken cancellationToken)
    {
        if (request.StoreId == Guid.Empty)
        {
            throw new ArgumentException("Store ID cannot be empty", nameof(request.StoreId));
        }

        var store = await storeRepository.GetByIdAsync(request.StoreId);
        if (store == null)
        {
            throw new KeyNotFoundException($"Store with ID {request.StoreId} not found");
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

        store.SellerIds ??= new List<Guid>();

        if (store.SellerIds.Contains(user.Id))
        {
            throw new InvalidOperationException("Seller already exists in this store");
        }

        store.SellerIds.Add(user.Id);
        user.UserType = UserType.SELLER;

        await storeRepository.UpdateAsync(store);
        await userRepository.UpdateAsync(user);
        await SendEmailToUserAdded(user, store);
        return true;
    }


    private async Task SendEmailToUserAdded(User user, Store store)
    {
        await producer.Publish(
            new NewUserEmail(
                new Contact(
                    user.Name ?? string.Empty,
                    user.Email ?? string.Empty
                ),
                user.UserType.ToString(),
                store.Name ?? string.Empty,
                Environment.GetEnvironmentVariable("ADMIN_PANEL_URL") ?? string.Empty,
                [
                    "Sell products",
                    "Manage inventory",
                ],
                "+"+store.PhoneNumber ?? string.Empty

            )
        );

    }
}
