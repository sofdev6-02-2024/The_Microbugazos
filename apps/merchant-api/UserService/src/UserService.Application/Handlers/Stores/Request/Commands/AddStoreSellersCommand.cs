using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Dtos.Stores;

namespace UserService.Application.Handlers.Stores.Request.Commands;
public class AddStoreSellersCommand(
    AddStoreSellersDto addStoreSellersDto)
    : IRequest<BaseResponse>
{
    public AddStoreSellersDto AddStoreSellersDto { get; set; } = addStoreSellersDto;
}
