
using AutoMapper;
using UserService.Application.Dtos.Stores;
using UserService.Domain.Entities.Concretes;

namespace UserService.Application.Profiles;

public class StoreProfile : Profile
{
    public StoreProfile()
    {
        CreateMap<Store, StoreDto>();
        CreateMap<StoreDto, Store>();
    }
}
