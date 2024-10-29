using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using UserService.Domain.Bases;
using UserService.Infraestructure.Repositories.Interfaces;

namespace UserService.Infraestructure.Repositories.Bases;

public class BaseRepository<T>(DbContext context) : IRepository<T> where T : BaseEntity
{
    protected readonly DbContext Context = context;
    protected readonly DbSet<T> DbSet = context.Set<T>();
    
    public async Task<T> AddAsync(T entity)
    {
        await DbSet.AddAsync(entity);
        await Context.SaveChangesAsync();
        return entity;
    }

    public async Task<T> UpdateAsync(T entity)
    {
        DbSet.Update(entity);
        await Context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        if (entity == null) return false;
        
        entity.IsActive = false;
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<T?> GetByIdAsync(Guid id)
    {
        return await DbSet.FindAsync(id);
    }

    public async Task<IEnumerable<T>> GetAllAsync(int pageNumber, int pageSize)
    {
        return await DbSet.Where(e => e.IsActive)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await DbSet.Where(e => e.IsActive)
            .Where(predicate)
            .ToListAsync();
    }

    public async Task<int> GetCountAsync()
    {
        return await DbSet.CountAsync();
    }
}
