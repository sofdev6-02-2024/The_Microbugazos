using MediatR;
using UserService.Application.Dtos.Stores;

namespace UserService.Application.Handlers.Stores.Request.Commands;

public class UpdateStoreCommand(Guid id, StoreDto storeDto) : IRequest<StoreDto>
{
    public Guid Id { get; set; } = id;
    public StoreDto StoreDto { get; set; } = storeDto;
}