using AutoMapper;
using Backend.Application.Dtos.Stores;
using Backend.Domain.Entities.Concretes;

namespace Backend.Application.Profiles;

public class StoreProfile : Profile
{
    public StoreProfile()
    {
        CreateMap<Store, StoreDto>();
        CreateMap<StoreDto, Store>();
    }
}
