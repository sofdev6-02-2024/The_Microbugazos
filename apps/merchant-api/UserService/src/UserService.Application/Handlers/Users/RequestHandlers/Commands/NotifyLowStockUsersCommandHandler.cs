using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MassTransit;
using MediatR;
using NotificationService.Domain.Dtos;
using NotificationService.Domain.Dtos.Emails;
using UserService.Application.Handlers.Users.Request.Commands;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Users.RequestHandlers.Commands;


public class NotifyLowStockUsersCommandHandler(IUserRepository userRepository, IResponseHandlingHelper responseHandlingHelper, IBus producer) : IRequestHandler<NotifyLowStockUsersCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(NotifyLowStockUsersCommand request, CancellationToken cancellationToken)
    {
        foreach (var lowStockDetail in request.LowStockEmails)
        {
            var users = await userRepository.GetByAsync((user) => user.Store != null && user.Store.Id == lowStockDetail.Key);

            var ownerUser = users.First();
            if (ownerUser == null)
            {
                return responseHandlingHelper.BadRequest<bool>("The users with the follow store id " + lowStockDetail.Key + " was not found", null);
            }

            await producer.Publish(new LowStockEmail(
                new Contact(
                    ownerUser.Name ?? string.Empty,
                    ownerUser.Email ?? string.Empty
                ),
                lowStockDetail.Value,
                Environment.GetEnvironmentVariable("ADMIN_PANEL_URL") ?? string.Empty
            ));
        }

        return responseHandlingHelper.Ok("The users have been successfully notified.", true);
    }
}

