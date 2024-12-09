using MongoDB.Driver;
using ReviewService.Interfaces;

namespace ReviewService.Infrastructure.Repositories.Interfaces;

public interface IRepository<T> where T : IEntity
{
    Task<T?> GetByIdAsync(Guid id);
    Task<ICollection<T>> GetAllAsync(int pageNumber, int pageSize);
    Task<uint> CountAsync();
    Task<T> AddAsync(T entity);
    Task<int> UpdateAsync(Guid id, T entity, UpdateDefinition<T> update);
    Task<int> DeleteAsync(Guid id);
}