using MediatR;
using UserService.Application.Dtos.Stores;

namespace UserService.Application.Handlers.Stores.Request.Queries;

public class GetStoreByIdQuery(Guid id) : IRequest<StoreDto?>
{
    public Guid Id { get; set; } = id;
}
