using System.Linq.Expressions;
using InventoryService.Domain.Bases;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Intraestructure.Repositories.Interfaces;

public interface IRepository<T> where T : BaseEntity
{
    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task<bool> DeleteAsync(Guid id);
    Task<T?> GetByIdAsync(Guid id);
    Task<IEnumerable<T>> GetAllAsync(int pageNumber, int pageSize);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
    Task<int> GetCountAsync();
    DbSet<T> GetDbSet();
}