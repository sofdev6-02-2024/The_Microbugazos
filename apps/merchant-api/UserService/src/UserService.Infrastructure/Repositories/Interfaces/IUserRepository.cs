using UserService.Domain.Entities.Concretes;

namespace UserService.Infrastructure.Repositories.Interfaces;

public interface IUserRepository : ICrudRepository<User>
{
    Task<User?> GetUserWithDetails(Guid id);
}