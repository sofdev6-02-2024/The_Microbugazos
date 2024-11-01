using System.Linq.Expressions;
using UserService.Domain.Entities.Bases;
using UserService.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace UserService.Infrastructure.Repositories.Abstract;

public abstract class BaseRepository<T>(DbContext context) : ICrudRepository<T>
    where T : BaseEntity
{

    protected readonly DbContext Context = context;

    public virtual Task<T> AddAsync(T entity)
    {
        Context.Set<T>().Add(entity);
        Context.SaveChanges();

        return Task.FromResult(entity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            entity.IsActive = false;
            await UpdateAsync(entity);
            Context.SaveChanges();
        }
        return true;
    }
    public virtual async Task<IEnumerable<T>> GetAllAsync(int page, int limit)
    {
        return await Context.Set<T>()
            .Skip((page - 1) * limit)
            .Take(limit)
            .ToListAsync();
    }


    public virtual async Task<T?> GetByIdAsync(Guid id)
    {
        var entity = await Context.Set<T>().FindAsync(id);
        return entity;
    }

    public virtual Task<T> UpdateAsync(T entity)
    {
        entity.UpdatedAt = DateTime.Now;
        Context.Set<T>().Update(entity);
        return Task.FromResult(entity);
    }


    public async Task<int> GetCountAsync()
    {
        return await Context.Set<T>().CountAsync();
    }

    public virtual async Task<IEnumerable<T>> GetByAsync(Expression<Func<T, bool>> predicate, int pageNumber = 1, int pageSize = 1)
    {
        return await Context.Set<T>()
                        .Where(predicate)
                        .Skip((pageNumber - 1) * pageSize)
                        .Take(pageSize)
                        .ToListAsync();
    }
}
