using Backend.Domain.Entities.Concretes;

namespace Backend.Infrastructure.Repositories.Interfaces;

public interface IUserRepository : ICrudRepository<User>
{
    Task<User?> GetUserWithDetails(Guid id);
    Task<User?> GetUserByIdentityId(string identityId);
    Task<User?> GetUserByEmailAsync(string email);
}
