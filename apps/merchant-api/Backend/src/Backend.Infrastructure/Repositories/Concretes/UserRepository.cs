using Backend.Domain.Entities.Concretes;
using Backend.Infrastructure.Repositories.Abstract;
using Backend.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories.Concretes;

public class UserRepository(DbContext context) : BaseRepository<User>(context), IUserRepository
{
    public Task<User?> GetUserByIdentityId(string identityId)
    {
        return Context.Set<User>().FirstOrDefaultAsync(x => x.IdentityId == identityId);
    }

    public async Task<User?> GetUserWithDetails(Guid id)
    {
        return await Context.Set<User>()
                            .Include(x => x.Address)
                            .FirstOrDefaultAsync(x => x.Id == id);
    }
    public Task<User?> GetUserByEmailAsync(string email)
    {
        return Context.Set<User>().FirstOrDefaultAsync(x => x.Email == email);
    }
}
