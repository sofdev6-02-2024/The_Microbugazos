using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using InventoryService.Commons.Params;
using System.Linq.Expressions;


namespace InventoryService.Intraestructure.Repositories.Concretes;

public class ProductRepository(InventoryDbContext context, IRepository<Category> categoryRepository)
    : BaseRepository<Product>(context), IRepository<Product>, IProductRepository
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


    public async Task<IEnumerable<Product>> GetProductsByStoreId(
        Guid id,
        int pageNumber,
        int pageSize,
        ProductFilteringQueryParams queryParams)
    {
        var query = await _GetBaseQueryProductsByStoreId(id, queryParams);
        query = _ApplySort(query, queryParams);

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
            query = await _ApplyFilters(query, queryParams);
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
            query = await _ApplyFilters(query, queryParams);
        }
        return await query.CountAsync();
    }


    private async Task<IQueryable<Product>> _ApplyFilters(IQueryable<Product> query, ProductFilteringQueryParams queryParams)
    {
        var filters = await _GetFilters(queryParams);
        return filters.Aggregate(query, (current, filter) => current.Where(filter));
    }


    private async Task<List<Expression<Func<Product, bool>>>> _GetFilters(ProductFilteringQueryParams queryParams)
    {
        List<Expression<Func<Product, bool>>> predicates = [];
        if (queryParams.CategoryId.HasValue)
        {
            Guid id = (Guid)queryParams.CategoryId;
            var category = await categoryRepository.GetByIdAsync(id);

            if (category == null) return [];
            var isParent = category.ParentCategory == null;

            if (isParent)
            {
                var subCategories = category.SubCategories;
                predicates.Add(p => subCategories.Contains(p.Categories.First()));
            }
            else
            {
                predicates.Add(p => p.Categories.First() == category);
            }
        }

        if (queryParams.MinPrice.HasValue)
        {
            predicates.Add(p => p.BasePrice >= queryParams.MinPrice.Value);
        }

        if (queryParams.MaxPrice.HasValue)
        {
            predicates.Add(p => p.BasePrice <= queryParams.MaxPrice.Value);
        }


        if (queryParams.Search != null && queryParams.Search.Length > 0)
        {
            Console.WriteLine("Search: " + queryParams.Search);
            predicates.Add(p => p.Name.ToLower().Contains(queryParams.Search.ToLower()));
        }

        if (queryParams.MinRating.HasValue)
        {
            // TODO: Implement filter support. 
        }

        if (queryParams.MaxRating.HasValue)
        {
            // TODO: Implement filter support. 
        }

        return predicates;
    }

    private IQueryable<Product> _ApplySort(IQueryable<Product> query, ProductFilteringQueryParams queryParams)
    {
        bool someSortApplied = false;

        if (queryParams.NameAsc.HasValue)
        {
            query = (bool)queryParams.NameAsc
                ? query.OrderBy(p => p.Name.ToLower())
                : query.OrderByDescending(p => p.Name.ToLower());
            someSortApplied = true;
        }

        if (queryParams.PriceAsc.HasValue)
        {
            query = (bool)queryParams.PriceAsc
                ? someSortApplied
                    ? ((IOrderedQueryable<Product>)query).ThenBy(p => p.BasePrice)
                    : query.OrderBy(p => p.BasePrice)
                : someSortApplied
                    ? ((IOrderedQueryable<Product>)query).ThenByDescending(p => p.BasePrice)
                    : query.OrderByDescending(p => p.BasePrice);
            someSortApplied = true;
        }


        if (queryParams.CreatedAtAsc.HasValue)
        {
            query = (bool)queryParams.CreatedAtAsc
                ? someSortApplied
                    ? ((IOrderedQueryable<Product>)query).ThenBy(p => p.CreatedAt)
                    : query.OrderBy(p => p.CreatedAt)
                : someSortApplied
                    ? ((IOrderedQueryable<Product>)query).ThenByDescending(p => p.CreatedAt)
                    : query.OrderByDescending(p => p.CreatedAt);
            someSortApplied = true;
        }

        if (queryParams.RatingAsc.HasValue)
        {
            // TODO: Add support for rating sort.
        }

        if (!someSortApplied)
        {
            query = query.OrderBy(p => p.CreatedAt);
        }

        return query;
    }


}