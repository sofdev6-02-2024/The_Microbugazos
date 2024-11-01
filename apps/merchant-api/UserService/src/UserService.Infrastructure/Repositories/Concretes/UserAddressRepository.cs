using Microsoft.EntityFrameworkCore;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Abstract;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Infrastructure.Repositories.Concretes;

public class UserAddressRepository(DbContext context)
    : BaseRepository<UserAddress>(context), IUserAddressRepository
{}
