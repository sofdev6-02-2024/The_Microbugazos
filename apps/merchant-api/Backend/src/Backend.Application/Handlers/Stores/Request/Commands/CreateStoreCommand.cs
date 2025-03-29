using Backend.Application.Dtos.Stores;
using Backend.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace Backend.Application.Handlers.Stores.Request.Commands;

public class CreateStoreCommand(StoreDto storeDto) : IRequest<BaseResponse>
{
    public StoreDto StoreDto { get; set; } = storeDto;
}