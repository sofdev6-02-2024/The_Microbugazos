using Backend.Application.Handlers.Users.Request.Commands;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Domain.Entities.Concretes;
using Backend.Domain.Entities.Concretes.Emails;
using Backend.Domain.Entities.Interfaces;
using Backend.Infrastructure.Repositories.Interfaces;
using MassTransit;
using MediatR;

namespace Backend.Application.Handlers.Users.RequestHandlers.Commands;


public class NotifyLowStockUsersCommandHandler(IUserRepository userRepository, IStoreRepository storeRepository, IResponseHandlingHelper responseHandlingHelper, IBus producer) : IRequestHandler<NotifyLowStockUsersCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(NotifyLowStockUsersCommand request, CancellationToken cancellationToken)
    {
        foreach (var lowStockDetail in request.LowStockEmails)
        {
            Guid storeID = lowStockDetail.Key;
            var store = await storeRepository.GetByIdAsync(storeID);
            if (store == null)
            {
                return responseHandlingHelper.BadRequest<bool>("The store with the follow id " + lowStockDetail.Key + " was not found", null);
            }

            List<Guid> sellerIds = [.. store.SellerIds];


            var users = await userRepository.GetByAsync((user) => user.Store != null && user.Store.Id == storeID);

            if (users.Count() == 0)
            {
                return responseHandlingHelper.BadRequest<bool>("The users with the follow store id " + storeID + " were not found", null);
            }
            var usersList = users.ToList();

            foreach (var sellerId in sellerIds)
            {
                var seller = await userRepository.GetByIdAsync(sellerId);
                if (seller != null)
                {
                    usersList.Add(seller);
                }
            }

            foreach (var user in usersList)
            {
                await SendEmail(user.Name, user.Email, lowStockDetail.Value);
            }
        }

        return responseHandlingHelper.Ok("The users have been successfully notified.", true);
    }


    private async Task SendEmail(string? name, string? email, List<OrderItem> lowStockDetail)
    {
        await producer.Publish(new LowStockEmail(
                new Contact(
                    name ?? string.Empty,
                    email ?? string.Empty
                ),
                lowStockDetail,
                Environment.GetEnvironmentVariable("ADMIN_PANEL_URL") ?? string.Empty
                ));
    }
}

