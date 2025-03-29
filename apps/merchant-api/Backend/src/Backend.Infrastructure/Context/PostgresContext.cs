using Backend.Domain.Entities.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Context;

public class PostgresContext(DbContextOptions<PostgresContext> options) : DbContext(options)
{
    public DbSet<TEntity> Set<TEntity>() where TEntity : class, IEntity
    {
        return base.Set<TEntity>();
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(typeof(PostgresContext).Assembly);

        base.OnModelCreating(builder);
    }
}
