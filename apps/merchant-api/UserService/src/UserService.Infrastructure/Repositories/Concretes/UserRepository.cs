using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Abstract;
using UserService.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace UserService.Infrastructure.Repositories.Concretes;

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
}
