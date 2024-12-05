using ReviewService.Interfaces;

namespace ReviewService.Infrastructure.Repositories.Interfaces;

public interface IRepository<T> where T : IEntity
{
    Task<T?> GetByIdAsync(Guid id);
    ICollection<T> GetAllAsync(int pageNumber, int pageSize);
    uint CountAsync();
    Task<T> AddAsync(T entity);
    Task<T> Update(T entity);
    Task<T?> DeleteAsync(Guid id);
}