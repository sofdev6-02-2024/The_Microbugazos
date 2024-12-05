using Microsoft.EntityFrameworkCore;
using ReviewService.Bases;
using ReviewService.Infrastructure.Repositories.Interfaces;

namespace ReviewService.Infrastructure.Repositories.Bases;

public class BaseRepository<T>(DbSet<T> dbSet) : IRepository<T> where T : BaseEntity
{
    public async Task<T?> GetByIdAsync(Guid id)
    {
        var entity = await dbSet.FindAsync(id);
        return entity is { IsActive: true } ? entity : null;
    }

    public ICollection<T> GetAllAsync(int pageNumber, int pageSize)
    {
        var collection = dbSet
            .Where(e => e.IsActive)
            .OrderBy(e => e.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize).ToList();
        return collection;
    }

    public uint CountAsync()
    {
        var quantity = dbSet.Count(e => e.IsActive);
        return (uint)quantity;
    }

    public async Task<T> AddAsync(T entity)
    {
        var response = await dbSet.AddAsync(entity);
        return response.Entity;
    }

    public async Task<T> Update(T entity)
    {
        entity.UpdatedAt = DateTime.UtcNow;
        var response = dbSet.Update(entity);
        return response.Entity;
    }

    public async Task<T?> DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        if (entity == null) return null;

        entity.DeletedAt = DateTime.UtcNow;
        entity.IsActive = false;
        return entity;
    }
}