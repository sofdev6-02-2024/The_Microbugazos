using System.Linq.Expressions;
using InventoryService.Domain.Bases;
using InventoryService.Intraestructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Intraestructure.Repositories.Bases;

public abstract class BaseRepository<T>(DbContext context) : IRepository<T>
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

    public virtual async Task<T?> GetByIdAsync(Guid id)
    {
        var entity = await DbSet.FindAsync(id);
        return entity is { IsActive: true } ? entity : null;
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync(int pageNumber, int pageSize)
    {
        return await DbSet.Where(e => e.IsActive)
            .OrderBy(e => e.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        return await DbSet.Where(e => e.IsActive).ToListAsync();
    }

    public virtual async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await DbSet.Where(e => e.IsActive)
            .Where(predicate)
            .ToListAsync();
    }

    public virtual async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate, int pageNumber = 0, int pageSize = 10)
    {
        if (pageSize < 1) pageSize = 10;

        IQueryable<T> query = DbSet.Where(e => e.IsActive)
            .Where(predicate);

        if (pageNumber > 0 && pageSize > 0)
        {
            query = query.Skip((pageNumber - 1) * pageSize).Take(pageSize);
        }

        return await query.ToListAsync();
    }


    public virtual async Task<int> GetCountAsync(Expression<Func<T, bool>>? predicate = null)
    {
        var finalPredicate = predicate ?? (e => true);

        return await DbSet
            .Where(e => e.IsActive)
            .Where(finalPredicate)
            .CountAsync();
    }

}