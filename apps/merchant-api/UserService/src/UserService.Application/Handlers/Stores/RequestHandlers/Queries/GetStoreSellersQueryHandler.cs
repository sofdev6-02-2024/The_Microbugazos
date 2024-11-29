using AutoMapper;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Queries;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Queries;

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
