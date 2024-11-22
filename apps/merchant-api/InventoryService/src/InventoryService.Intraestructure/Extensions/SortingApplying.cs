using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Types;
using Microsoft.EntityFrameworkCore.Query;


public static class QueryExtensions
{
    public static IOrderedQueryable<Product> ApplySorting(this IIncludableQueryable<Product, Variant?> query, List<(string, SortingType)> sorting)
    {

        var (orderedByName, orderedByNameQuery) = OrderByName(query, sorting[0].Item2);
        if (orderedByName)
        {
            return orderedByNameQuery!;
        }

        (orderedByName, orderedByNameQuery) = OrderByPrice(query, sorting[1].Item2);
        if (orderedByName)
        {
            return orderedByNameQuery!;
        }


        return query.OrderBy(p => p.CreatedAt);
    }

    private static (bool, IOrderedQueryable<Product>?) OrderByName(IIncludableQueryable<Product, Variant?> query, SortingType sort)
    {
        if (sort != SortingType.NONE)
        {
            if (sort == SortingType.ASC)
            {
                return (true, query.OrderBy(p => p.Name));
            }
            else
            {
                return (true, query.OrderByDescending(p => p.Name));
            }

        }
        return (false, null);
    }


    private static (bool, IOrderedQueryable<Product>?) OrderByPrice(IIncludableQueryable<Product, Variant?> query, SortingType sort)
    {
        if (sort != SortingType.NONE)
        {
            if (sort == SortingType.ASC)
            {
                return (true, query.OrderBy(p => p.BasePrice));
            }
            else
            {
                return (true, query.OrderByDescending(p => p.BasePrice));
            }
        }
        return (false, null);
    }
}