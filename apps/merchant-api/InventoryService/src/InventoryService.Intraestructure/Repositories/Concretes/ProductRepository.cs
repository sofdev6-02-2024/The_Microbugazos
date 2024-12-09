using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using InventoryService.Commons.Params;
using System.Linq.Expressions;
using InventoryService.Intraestructure.Repositories.Utils;


namespace InventoryService.Intraestructure.Repositories.Concretes;

public class ProductRepository(InventoryDbContext context, ProductFiltersManager productFiltersManager)
    : BaseRepository<Product>(context), IProductRepository
{
    public override async Task<Product?> GetByIdAsync(Guid id)
    {
        return await DbSet
            .Where(e => e.IsActive)
            .Include(p => p.Images)
            .Include(p => p.Categories.Where(c => c.IsActive == true))
            .ThenInclude(c => c.ParentCategory)
            .Include(p => p.ProductVariants.Where(attr => attr.IsActive))
            .ThenInclude(pv => pv.Image)
            .Include(p => p.ProductVariants.Where(attr => attr.IsActive))
            .ThenInclude(pa => pa.Attributes)
            .ThenInclude(pa => pa.Variant)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public override async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await DbSet
            .Where(e => e.IsActive)
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
            .Include(p => p.Images)
            .Include(p => p.Categories.Where(c => c.IsActive == true))
            .ThenInclude(c => c.ParentCategory)
            .Include(p => p.ProductVariants)
            .ThenInclude(pv => pv.Image)
            .Include(p => p.ProductVariants)
            .ThenInclude(pa => pa.Attributes)
            .ThenInclude(pa => pa.Variant)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetProductsByStoreId(
        Guid id,
        int pageNumber,
        int pageSize,
        ProductFilteringQueryParams queryParams)
    {
        var query = await _GetBaseQueryProductsByStoreId(id, queryParams);
        query = productFiltersManager._ApplySort(query, queryParams);

        return await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    private async Task<IQueryable<Product>> _GetBaseQueryProductsByStoreId(Guid id, ProductFilteringQueryParams? queryParams = null)
    {
        var query = DbSet
            .Where(e => e.IsActive)
            .Where(e => e.StoreId == id);

        if (queryParams != null)
        {
            query = await productFiltersManager._ApplyFilters(query, queryParams);
        }

        return query
            .Include(p => p.Images)
            .Include(p => p.Categories.Where(c => c.IsActive == true))
            .ThenInclude(c => c.ParentCategory)
            .Include(p => p.ProductVariants)
            .ThenInclude(pv => pv.Image)
            .Include(p => p.ProductVariants)
            .ThenInclude(pa => pa.Attributes)
            .ThenInclude(pa => pa.Variant)
            .AsQueryable();
    }



    public async Task<int> GetCountProductsByStoreId(Guid id, ProductFilteringQueryParams? queryParams = null)
    {
        var query = DbSet.Where(e => e.StoreId == id && e.IsActive);
        if (queryParams != null)
        {
            query = await productFiltersManager._ApplyFilters(query, queryParams);
        }
        return await query.CountAsync();
    }
}