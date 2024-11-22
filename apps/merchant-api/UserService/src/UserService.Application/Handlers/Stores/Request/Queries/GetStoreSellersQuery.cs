using MediatR;
using UserService.Application.Dtos.Stores;

namespace UserService.Application.Handlers.Stores.Request.Queries;

public class GetStoreSellersQuery(Guid storeId) : IRequest<List<SellerDto>>
{
    public Guid StoreId { get; set; } = storeId;
}
