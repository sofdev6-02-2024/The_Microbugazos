using UserService.Domain.Entities.Concretes;

namespace UserService.Infrastructure.Repositories.Interfaces;

public interface IStoreRepository : ICrudRepository<Store>
{
    Task<Store?> GetStoreForSellerAsync(Guid sellerId);
}