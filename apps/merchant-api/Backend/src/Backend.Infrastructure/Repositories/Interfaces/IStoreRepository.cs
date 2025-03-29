using Backend.Domain.Entities.Concretes;

namespace Backend.Infrastructure.Repositories.Interfaces;

public interface IStoreRepository : ICrudRepository<Store>
{
    Task<Store?> GetStoreForSellerAsync(Guid sellerId);
}