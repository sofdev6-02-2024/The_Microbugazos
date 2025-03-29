using Backend.Application.Handlers.Stores.Request.Commands;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Domain.Entities.Concretes;
using Backend.Infrastructure.Repositories.Interfaces;
using MediatR;

namespace Backend.Application.Handlers.Stores.RequestHandlers.Commands;

public class DeleteStoreSellersCommandHandler(
    IStoreRepository storeRepository, 
    IUserRepository userRepository,
    IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<DeleteStoreSellersCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(DeleteStoreSellersCommand request, CancellationToken cancellationToken)
    {
        var store = await storeRepository.GetByIdAsync(request.StoreId);
        if (store == null)
            return responseHandlingHelper.BadRequest<Guid>("Store not found");
        
        var user = await userRepository.GetByIdAsync(request.SellerId);
        if (user == null)
            return responseHandlingHelper.BadRequest<Guid>($"User with ID {request.SellerId} not found");

        var response = store.SellerIds.Remove(request.SellerId);

        user.UserType = UserType.CLIENT;

        await userRepository.UpdateAsync(user);
        
        await storeRepository.UpdateAsync(store);

        return responseHandlingHelper.Ok("The seller has been deleted", response);
    }
}