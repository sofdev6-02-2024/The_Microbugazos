using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;
using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Intraestructure.Repositories.Concretes;

public class ProductRepository(InventoryDbContext context) : BaseRepository<Product>(context)
{
    public override async Task<Product?> GetByIdAsync(Guid id)
    {
        return await DbSet
            .AsSplitQuery()
            .Include(p => p.Images)
            .Include(p => p.Categories.Where(c => c.IsActive == true))
            .ThenInclude(c => c.ParentCategory)
            .Include(p => p.ProductVariants)
            .ThenInclude(pv => pv.Image)
            .Include(p => p.ProductVariants)
            .ThenInclude(pa => pa.Attributes)
            .ThenInclude(pa => pa.Variant)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public override async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await DbSet
            .Where(e => e.IsActive)
            .AsSplitQuery()
            .Include(p => p.Images)
            .Include(p => p.Categories.Where(c => c.IsActive == true))
            .ThenInclude(c => c.ParentCategory)
            .Include(p => p.ProductVariants)
            .ThenInclude(pv => pv.Image)
            .Include(p => p.ProductVariants)
            .ThenInclude(pa => pa.Attributes)
            .ThenInclude(pa => pa.Variant)
            .ToListAsync();
    }
    
    public override async Task<IEnumerable<Product>> GetAllAsync(int pageNumber, int pageSize)
    {
        return await DbSet.Where(e => e.IsActive)
            .AsSplitQuery()
            .Include(p => p.Images)
            .Include(p => p.Categories.Where(c => c.IsActive == true))
            .ThenInclude(c => c.ParentCategory)
            .Include(p => p.ProductVariants)
            .ThenInclude(pv => pv.Image)
            .Include(p => p.ProductVariants)
            .ThenInclude(pa => pa.Attributes)
            .ThenInclude(pa => pa.Variant)
            .OrderBy(c => c.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }
}