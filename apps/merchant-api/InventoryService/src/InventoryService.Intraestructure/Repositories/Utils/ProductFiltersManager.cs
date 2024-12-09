using System.Linq.Expressions;
using InventoryService.Commons.Params;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;

namespace InventoryService.Intraestructure.Repositories.Utils;

public class ProductFiltersManager(IRepository<Category> categoryRepository)
{
    public async Task<IQueryable<Product>> _ApplyFilters(IQueryable<Product> query, ProductFilteringQueryParams queryParams)
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

    public IQueryable<Product> _ApplySort(IQueryable<Product> query, ProductFilteringQueryParams queryParams)
    {
        var someSortApplied = false;

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


        if (queryParams.RatingAsc.HasValue)
        {
            // TODO: Add support for rating sort.
        }

        if (!someSortApplied)
        {
            query = query.OrderByDescending(p => p.CreatedAt);
        }

        return query;
    }
}