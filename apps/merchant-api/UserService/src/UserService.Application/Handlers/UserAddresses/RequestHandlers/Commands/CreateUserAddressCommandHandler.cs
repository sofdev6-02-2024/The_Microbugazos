using UserService.Application.Handlers.UserAddresses.Request.Commands;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;
using MediatR;

namespace UserService.Application.Handlers.UserAddresses.RequestHandlers.Commands;

public class CreateUserAddressCommandHandler(IUserAddressRepository userAddressRepository) : IRequestHandler<CreateUserAddressCommand, UserAddress>
{
    public async Task<UserAddress> Handle(CreateUserAddressCommand request, CancellationToken cancellationToken)
    {
        UserAddress orderItem = request.UserAddress;
        orderItem = await userAddressRepository.AddAsync(orderItem);
        return orderItem;
    }
}

