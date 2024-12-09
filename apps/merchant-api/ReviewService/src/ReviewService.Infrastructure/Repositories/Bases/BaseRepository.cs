using MongoDB.Driver;
using ReviewService.Infrastructure.Context.Interfaces;
using ReviewService.Infrastructure.Repositories.Interfaces;
using ReviewService.Interfaces;

namespace ReviewService.Infrastructure.Repositories.Bases;

public class BaseRepository<T>(IContext<T> context) : IRepository<T> where T : IEntity
{
    public virtual async Task<T?> GetByIdAsync(Guid id)
    {
        var filter = Builders<T>.Filter
            .Eq(entity => entity.Id, id);
        var entity = await context.Collection.Find(filter).FirstOrDefaultAsync();
        return entity;
    }

    public async Task<ICollection<T>> GetAllAsync(int pageNumber, int pageSize)
    {
        var filter = Builders<T>.Filter
            .Eq(entity => entity.IsActive, true);
        var collection = await context.Collection.Find(filter)
            .SortBy(e => e.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Limit(pageSize).ToListAsync();
        return collection;
    }

    public async Task<uint> CountAsync()
    {
        var filter = Builders<T>.Filter
            .Eq(entity => entity.IsActive, true);
        var quantity = await context.Collection.Find(filter).CountDocumentsAsync();
        return (uint)quantity;
    }

    public async Task<T> AddAsync(T entity)
    {
        try
        {
            await context.Collection.InsertOneAsync(entity);
            return entity;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<int> UpdateAsync(Guid id, T entity, UpdateDefinition<T> update)
    {
        entity.UpdatedAt = DateTime.UtcNow;

        var filter = Builders<T>.Filter
            .Eq(e => e.Id, id);

        var updateDefinition = update.Set(e => e.UpdatedAt, DateTime.UtcNow);

        var response = await context.Collection.UpdateOneAsync(filter, updateDefinition);
        return (int)response.ModifiedCount;
    }

    public async Task<int> DeleteAsync(Guid id)
    {
        var filter = Builders<T>.Filter
            .Eq(e => e.Id, id);

        var result = await context.Collection.DeleteOneAsync(filter);
        return (int)result.DeletedCount;
    }
}