using MediatR;
using UserService.Application.Dtos.Stores;

namespace UserService.Application.Handlers.Stores.Request.Commands;

public class CreateStoreCommand(StoreDto storeDto) : IRequest<Guid>
{
    public StoreDto StoreDto { get; set; } = storeDto;
}