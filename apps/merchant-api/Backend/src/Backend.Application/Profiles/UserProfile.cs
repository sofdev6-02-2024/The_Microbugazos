using AutoMapper;
using Backend.Application.Dtos.Stores;
using Backend.Application.Dtos.Users;
using Backend.Domain.Entities.Concretes;

namespace Backend.Application.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.UserType));
        CreateMap<UserDto, User>();
        CreateMap<User, SellerDto>();
    }
}
