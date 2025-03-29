using Backend.Application.Handlers.UserAddresses.Request.Commands;
using Backend.Domain.Entities.Concretes;
using Backend.Infrastructure.Repositories.Interfaces;
using MediatR;

namespace Backend.Application.Handlers.UserAddresses.RequestHandlers.Commands;

public class CreateUserAddressCommandHandler(IUserAddressRepository userAddressRepository) : IRequestHandler<CreateUserAddressCommand, UserAddress>
{
    public async Task<UserAddress> Handle(CreateUserAddressCommand request, CancellationToken cancellationToken)
    {
        UserAddress orderItem = request.UserAddress;
        orderItem = await userAddressRepository.AddAsync(orderItem);
        return orderItem;
    }
}

