namespace InventoryService.Intraestructure.Data;
using Microsoft.EntityFrameworkCore;

public class InventoryDbContext(DbContextOptions<InventoryDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(typeof(InventoryDbContext).Assembly);
        
        base.OnModelCreating(builder);
    }
}