using MediatR;
using UserService.Application.Dtos.Stores;

namespace UserService.Application.Handlers.Stores.Request.Queries;

public class GetStoreByUserIdQuery(Guid id) : IRequest<StoreDto?>
{
    public Guid Id { get; set; } = id;
}
