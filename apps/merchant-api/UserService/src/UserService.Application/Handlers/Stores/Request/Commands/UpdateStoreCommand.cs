using Commons.ResponseHandler.Responses.Bases;
using UserService.Application.Dtos.Stores;
using MediatR;

namespace UserService.Application.Handlers.Stores.Request.Commands;

public class UpdateStoreCommand(Guid id, StoreDto storeDto) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
    public StoreDto StoreDto { get; set; } = storeDto;
}