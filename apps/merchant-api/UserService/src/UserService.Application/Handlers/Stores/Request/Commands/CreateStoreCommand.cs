using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Dtos.Stores;

namespace UserService.Application.Handlers.Stores.Request.Commands;

public class CreateStoreCommand(StoreDto storeDto) : IRequest<BaseResponse>
{
    public StoreDto StoreDto { get; set; } = storeDto;
}