using AutoMapper;
using MediatR;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Stores.RequestHandlers.Commands;


public class UpdateStoreCommandHandler(IStoreRepository storeRepository, IMapper mapper) : IRequestHandler<UpdateStoreCommand, StoreDto>
{

    public async Task<StoreDto> Handle(UpdateStoreCommand request, CancellationToken cancellationToken)
    {
        var currentStore = await storeRepository.GetByIdAsync(request.StoreDto.Id) ?? throw new Exception("Store not found");

        currentStore.Name = request?.StoreDto?.Name ?? currentStore.Name;
        currentStore.Description = request?.StoreDto?.Description ?? currentStore.Description;
        currentStore.Address = request?.StoreDto.Address ?? currentStore.Address;
        currentStore.PhoneNumber = request?.StoreDto.PhoneNumber ?? currentStore.PhoneNumber;
        currentStore.BannerImage = request?.StoreDto.BannerImage ?? currentStore.BannerImage;
        currentStore.ProfileImage = request?.StoreDto.ProfileImage ?? currentStore.ProfileImage;

        var store = await storeRepository.UpdateAsync(currentStore);
        return mapper.Map<StoreDto>(store);
    }
}