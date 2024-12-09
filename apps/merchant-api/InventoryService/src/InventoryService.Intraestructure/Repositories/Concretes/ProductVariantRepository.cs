using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;
using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Intraestructure.Repositories.Concretes;

public class ProductVariantRepository(InventoryDbContext context) : BaseRepository<ProductVariant>(context)
{
    public override async Task<ProductVariant?> GetByIdAsync(Guid id)
    {
        return await DbSet
            .Where(e => e.IsActive)
            .Include(c => c.Attributes)
            .ThenInclude(pv => pv.Variant)
            .Include(c => c.Image)
            .FirstOrDefaultAsync(c => c.Id == id);  
    }

    public override async Task<IEnumerable<ProductVariant>> GetAllAsync(int pageNumber, int pageSize)
    {
        return await DbSet.Where(e => e.IsActive)
            .Include(c => c.Attributes)
            .ThenInclude(pv => pv.Variant)
            .Include(c => c.Image)
            .OrderBy(c => c.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }
    
    public override async Task<IEnumerable<ProductVariant>> GetAllAsync()
    {
        return await DbSet
            .Where(e => e.IsActive)
            .Include(c => c.Attributes)
            .Include(c => c.Image)
            .OrderBy(c => c.CreatedAt)
            .ToListAsync();
    }
}