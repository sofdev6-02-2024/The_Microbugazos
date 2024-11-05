using AutoMapper;
using UserService.Application.Dtos.Users;
using UserService.Domain.Entities.Concretes;

namespace UserService.Application.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<UserDto, User>();
    }
}
