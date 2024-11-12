using AutoMapper;
using UserService.Application.Dtos.User;
using UserService.Domain.Entities.Concretes;

namespace UserService.Application.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.UserType));
        CreateMap<UserDto, User>();
    }
}
