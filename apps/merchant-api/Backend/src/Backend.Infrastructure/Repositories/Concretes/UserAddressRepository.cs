using Backend.Domain.Entities.Concretes;
using Backend.Infrastructure.Repositories.Abstract;
using Backend.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories.Concretes;

public class UserAddressRepository(DbContext context)
    : BaseRepository<UserAddress>(context), IUserAddressRepository
{}
