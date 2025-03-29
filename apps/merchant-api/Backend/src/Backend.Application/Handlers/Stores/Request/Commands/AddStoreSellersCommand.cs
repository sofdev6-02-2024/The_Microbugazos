using Backend.Application.Dtos.Stores;
using Backend.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace Backend.Application.Handlers.Stores.Request.Commands;
public class AddStoreSellersCommand(
    AddStoreSellersDto addStoreSellersDto)
    : IRequest<BaseResponse>
{
    public AddStoreSellersDto AddStoreSellersDto { get; set; } = addStoreSellersDto;
}
