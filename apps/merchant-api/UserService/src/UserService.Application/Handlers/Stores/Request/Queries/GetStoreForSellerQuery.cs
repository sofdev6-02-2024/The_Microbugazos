using MediatR;
using UserService.Application.Dtos.Stores;

namespace UserService.Application.Handlers.Stores.Request.Queries;

public class GetStoreForSellerQuery(Guid sellerId) : IRequest<StoreDto?>
{
    public Guid SellerId { get; set; } = sellerId;
}
