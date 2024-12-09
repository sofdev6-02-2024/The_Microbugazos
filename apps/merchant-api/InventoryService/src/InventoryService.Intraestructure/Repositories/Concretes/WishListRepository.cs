using InventoryService.Commons.Params;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;
using InventoryService.Intraestructure.Repositories.Interfaces;
using InventoryService.Intraestructure.Repositories.Utils;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Intraestructure.Repositories.Concretes;

public class WishListRepository(InventoryDbContext context, ProductFiltersManager productFiltersManager) : BaseRepository<WishList>(context), IWishListRepository
{
    public async Task<IEnumerable<WishList>> GetWishListByUserId(
        Guid userId,
        int pageNumber,
        int pageSize,
        ProductFilteringQueryParams? queryParams = null)
    {
        var query = await _GetBaseQueryWishListByUserId(userId);
        
        Console.Write($"\n\n\n\n -> {queryParams!=null} \n\n\n");
        if (queryParams != null)
        {
            Console.Write("\n\n\n\n aaaaa \n\n\n");
            Console.Write("\n\n\n\n aaaaa \n\n\n");
            Console.Write("\n\n\n\n aaaaa \n\n\n");
            Console.Write("\n\n\n\n aaaaa \n\n\n");
            Console.Write("\n\n\n\n aaaaa \n\n\n");
            Console.Write("\n\n\n\n aaaaa \n\n\n");
            var productQuery = query.Select(w => w.Product);
            productQuery = await productFiltersManager._ApplyFilters(productQuery, queryParams);
            productQuery = productFiltersManager._ApplySort(productQuery, queryParams);
            
            query = query.Where(w => productQuery.Contains(w.Product));
        }
        else query = query.OrderByDescending(e => e.CreatedAt);

        return await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    private async Task<IQueryable<WishList>> _GetBaseQueryWishListByUserId(
        Guid userId)
    {
        return DbSet
            .Where(w => w.IsActive && w.UserId == userId && w.Product.IsActive)
            .AsSplitQuery()
            .Include(w => w.Product)
            .ThenInclude(p => p.Images)
            .Include(w => w.Product)
            .ThenInclude(p => p.Categories.Where(c => c.IsActive))
            .ThenInclude(c => c.ParentCategory)
            .Include(w => w.Product)
            .ThenInclude(p => p.ProductVariants)
            .ThenInclude(pv => pv.Image)
            .Include(w => w.Product)
            .ThenInclude(p => p.ProductVariants)
            .ThenInclude(pv => pv.Attributes)
            .ThenInclude(pa => pa.Variant)
            .AsQueryable();
    }
    
    public async Task<int> GetWishListCountByUserId(Guid userId,
        ProductFilteringQueryParams? queryParams = null)
    {
        var query = await _GetBaseQueryWishListByUserId(userId);

        if (queryParams == null) return await query.CountAsync();
        
        var productQuery = query.Select(w => w.Product);
        productQuery = await productFiltersManager._ApplyFilters(productQuery, queryParams);
        query = query.Where(w => productQuery.Contains(w.Product));
        return await query.CountAsync();
    }

    public async Task<WishList?> GetByUserIdAndProductIdAsync(Guid userId, Guid productId)
    {
        return await DbSet
            .Where(w => w.IsActive && w.UserId == userId && w.ProductId == productId)
            .FirstOrDefaultAsync();
    }
}