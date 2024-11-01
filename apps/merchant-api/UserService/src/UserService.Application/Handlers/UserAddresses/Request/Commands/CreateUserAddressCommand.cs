using UserService.Domain.Entities.Concretes;
using MediatR;

namespace UserService.Application.Handlers.UserAddresses.Request.Commands;

public class CreateUserAddressCommand(UserAddress userAddress) : IRequest<UserAddress>
{
    public UserAddress UserAddress { get; set; } = userAddress;
}
