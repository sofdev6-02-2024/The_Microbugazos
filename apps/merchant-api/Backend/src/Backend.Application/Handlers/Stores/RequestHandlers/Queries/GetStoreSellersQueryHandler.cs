using Backend.Application.Dtos.Stores;
using Backend.Application.Handlers.Stores.Request.Queries;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Infrastructure.Repositories.Interfaces;
using MediatR;

namespace Backend.Application.Handlers.Stores.RequestHandlers.Queries;

public class GetStoreSellersQueryHandler(
    IStoreRepository storeRepository,
    IUserRepository userRepository,
    IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<GetStoreSellersQuery, List<BaseResponse>>
{
    public async Task<List<BaseResponse>> Handle(GetStoreSellersQuery request, CancellationToken cancellationToken)
    {
        var store = await storeRepository.GetByIdAsync(request.StoreId);
        if (store == null)
            return [responseHandlingHelper.NotFound<SellerDto>("Store not found")];
        
        var sellers = new List<SellerDto>();
        
        foreach (var sellerId in store.SellerIds)
        {
            var user = await userRepository.GetByIdAsync(sellerId);
            if (user != null)
            {
                sellers.Add(new SellerDto 
                { 
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    UserType = user.UserType
                });
            }
        }
        return [responseHandlingHelper.Ok("The sellers for this store are: ", sellers)];
    }
}
