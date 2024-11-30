using MassTransit;
using MediatR;
using NotificationService.Domain.Dtos;
using NotificationService.Domain.Dtos.Emails;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using UserService.Application.Dtos.Stores;

using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Domain.Concretes;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Commands;


public class AddStoreSellersCommandHandler(
    IStoreRepository storeRepository, 
    IUserRepository userRepository,
    IResponseHandlingHelper responseHandlingHelper,
    IBus producer)
    : IRequestHandler<AddStoreSellersCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(AddStoreSellersCommand request, CancellationToken cancellationToken)
    {
        var addSellerDto = request.AddStoreSellersDto;
        if (addSellerDto.StoreId == Guid.Empty)
            return responseHandlingHelper.BadRequest<AddStoreSellersDto>("Store ID cannot be empty");

        var store = await storeRepository.GetByIdAsync(addSellerDto.StoreId);
        if (store == null)
            return responseHandlingHelper.BadRequest<AddStoreSellersDto>($"Store with ID {addSellerDto.StoreId} not found");

        User? user = null;
        
        if (!string.IsNullOrWhiteSpace(addSellerDto.SellerEmail))
        {
            user = await userRepository.GetUserByEmailAsync(addSellerDto.SellerEmail);
        }

        if (user == null)
        {
            return responseHandlingHelper.BadRequest<AddStoreSellersDto>($"User {user?.Id} not found");
        }

        store.SellerIds ??= new List<Guid>();

        if (store.SellerIds.Contains(user.Id))
        {
            return responseHandlingHelper.BadRequest<AddStoreSellersDto>("Seller already exists in this store");
        }

        store.SellerIds.Add(user.Id);
        user.UserType = UserType.SELLER;

        await storeRepository.UpdateAsync(store);
        await userRepository.UpdateAsync(user);
        await SendEmailToUserAdded(user, store);
        return responseHandlingHelper.Created("The seller was added successfully.", user.Id);

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
