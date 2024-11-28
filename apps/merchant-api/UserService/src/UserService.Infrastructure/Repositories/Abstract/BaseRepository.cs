using System.Linq.Expressions;
using UserService.Domain.Entities.Bases;
using UserService.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace UserService.Infrastructure.Repositories.Abstract;

public abstract class BaseRepository<T>(DbContext context) : ICrudRepository<T>
    where T : BaseEntity
{
    protected readonly DbContext Context = context;
    protected readonly DbSet<T> DbSet = context.Set<T>();
 
    public virtual async Task<T> AddAsync(T entity)
    {
        await DbSet.AddAsync(entity);
        await Context.SaveChangesAsync();
        return entity;
    }
    
    public virtual async Task<T> UpdateAsync(T entity)
    {
        entity.UpdatedAt = DateTime.UtcNow;
        DbSet.Update(entity);
        await Context.SaveChangesAsync();
        return entity;
    }
    
    public virtual async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        if (entity == null) return false;

        entity.DeletedAt = DateTime.UtcNow;
        entity.IsActive = false;
        await Context.SaveChangesAsync();
        return true;
    }
    
    public virtual async Task<IEnumerable<T>> GetAllAsync(int page, int limit)
    {
        return await Context.Set<T>()
            .Skip((page - 1) * limit)
            .Take(limit)
            .ToListAsync();
    }
    
    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        return await DbSet.Where(e => e.IsActive).ToListAsync();
    }
    
    public virtual async Task<T?> GetByIdAsync(Guid id)
    {
        var entity = await Context.Set<T>().FindAsync(id);
        return entity;
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
