using Backend.Application.Dtos.Stores;
using Backend.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace Backend.Application.Handlers.Stores.Request.Commands;

public class UpdateStoreCommand(Guid id, StoreDto storeDto) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
    public StoreDto StoreDto { get; set; } = storeDto;
}