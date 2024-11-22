using AutoMapper;
using UserService.Application.Dtos.Stores;
using UserService.Application.Dtos.Users;
using UserService.Domain.Entities.Concretes;

namespace UserService.Application.Profiles;

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
