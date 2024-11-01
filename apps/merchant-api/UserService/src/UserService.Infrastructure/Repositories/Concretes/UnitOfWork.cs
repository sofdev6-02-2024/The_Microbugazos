using UserService.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace UserService.Infrastructure.Repositories.Concretes;

public class UnitOfWork(DbContext context, IUserAddressRepository userAddressRepository, IUserRepository userRepository) : IUnitOfWork
{
    public IUserAddressRepository UserAddressRepository { get; } = userAddressRepository;

    public IUserRepository UserRepository { get; } = userRepository;

    private readonly DbContext _context = context;

    public async Task<int> CommitAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
