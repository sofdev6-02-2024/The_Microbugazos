using AutoMapper;
using MediatR;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Queries;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Queries;

public class GetStoreSellersQueryHandler(
    IStoreRepository storeRepository,
    IUserRepository userRepository,
    IMapper mapper)
    : IRequestHandler<GetStoreSellersQuery, List<SellerDto>>
{
    private readonly IMapper _mapper = mapper;

    public async Task<List<SellerDto>> Handle(GetStoreSellersQuery request, CancellationToken cancellationToken)
    {
        var store = await storeRepository.GetByIdAsync(request.StoreId)
                    ?? throw new Exception("Store not found");

        var sellers = new List<SellerDto>();
        
        foreach (var sellerId in store.SellerIds)
        {
            var user = await userRepository.GetByIdAsync(sellerId);
            if (user != null)
            {
                sellers.Add(new SellerDto 
                { 
                    Name = user.Name,
                    Email = user.Email 
                });
            }
        }

        return sellers;
    }
}
