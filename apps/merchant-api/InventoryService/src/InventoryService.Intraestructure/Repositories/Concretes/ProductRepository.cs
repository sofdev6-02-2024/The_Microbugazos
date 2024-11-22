using System.Diagnostics;
using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Domain.Params;
using InventoryService.Intraestructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Intraestructure.Repositories.Concretes;

public class ProductRepository(InventoryDbContext context, IRepository<Category> categoryRepository) 
    : BaseProductRepository(context)
{
    public override async Task<Product?> GetByIdAsync(Guid id)
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

    public override async Task<IEnumerable<Product>> GetProductsByStore(
        Guid id,
        int pageNumber,
        int pageSize,
        FilteringQueryParams queryParams)
    {
        var query = _GetBaseQueryProductsByStore(id);

        query = await _ApplyFilters(query, queryParams);
        query = _ApplySort(query, queryParams);

        return await query.OrderBy(c => c.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public override async Task<int> GetCountProductsByStore(Guid id, int pageNumber, int pageSize, FilteringQueryParams queryParams)
    {
        var query = _GetBaseQueryProductsByStore(id);

        query = await _ApplyFilters(query, queryParams);
        query = _ApplySort(query, queryParams);
        return await query.CountAsync();
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
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    private IQueryable<Product> _GetBaseQueryProductsByStore(Guid id)
    {
        return DbSet
            .Where(e => e.IsActive)
            .Where(e => e.StoreId == id)
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

    private async Task<IQueryable<Product>> _ApplyFilters(IQueryable<Product> query, FilteringQueryParams queryParams)
    {
        if (queryParams.CategoryId.HasValue)
        {
            Guid id = (Guid) queryParams.CategoryId;
            var category = await categoryRepository.GetByIdAsync(id);
            
            if (category == null) return query;
            var isParent = category!.ParentCategory == null;

            if (isParent)
            {
                var subCategories = category.SubCategories;
                query = query.Where(p => subCategories.Contains(p.Categories.First()));
            }
            else
            {
                query = query.Where(p => p.Categories.First() == category);
            }
        }
        
        if (queryParams.MinPrice.HasValue)
        {
            query = query.Where(p => p.BasePrice >= queryParams.MinPrice.Value);
        }

        if (queryParams.MaxPrice.HasValue)
        {
            query = query.Where(p => p.BasePrice <= queryParams.MaxPrice.Value);
        }

        if (queryParams.MinRating.HasValue)
        {
            // TODO: Implement filter support. 
        }

        if (queryParams.MaxRating.HasValue)
        {
            // TODO: Implement filter support. 
        }

        return query;
    }

    private IQueryable<Product> _ApplySort(IQueryable<Product> query, FilteringQueryParams queryParams)
    {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            Debug.Assert(queryParams.SortOrder != null, "queryParams.SortOrder != null");
            
            return queryParams.SortBy.ToLower() switch
            {
                "price" => queryParams.SortOrder.ToLower() == "desc" ? query.OrderByDescending(p => p.BasePrice) : query.OrderBy(p => p.BasePrice),
                "name" => queryParams.SortOrder.ToLower() == "desc" ? query.OrderByDescending(p => p.Name) : query.OrderBy(p => p.Name),
                _ => query.OrderBy(c => c.CreatedAt),
            };
        }

        return query;
    }
}