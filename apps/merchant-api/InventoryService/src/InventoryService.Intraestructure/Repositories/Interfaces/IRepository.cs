using System.Linq.Expressions;
using InventoryService.Domain.Bases;

namespace InventoryService.Intraestructure.Repositories.Interfaces;

public interface IRepository<T> where T : BaseEntity
{
    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task<bool> DeleteAsync(Guid id);
    Task<T?> GetByIdAsync(Guid id);
    Task<IEnumerable<T>> GetAllAsync(int pageNumber, int pageSize);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate, int pageNumber = 0, int pageSize = 10);
    Task<int> GetCountAsync(Expression<Func<T, bool>>? predicate = null);
}