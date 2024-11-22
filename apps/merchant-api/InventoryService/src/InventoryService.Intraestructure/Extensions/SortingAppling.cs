using System.Linq.Expressions;
using System.Reflection;
using InventoryService.Intraestructure.Types;


public static class QueryExtensions
{
    public static IQueryable<T> ApplySorting<T>(this IQueryable<T> query, string field, SortingType sortingType)
    {
        var propertyInfo = typeof(T).GetProperty(field, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

        if (propertyInfo == null)
            throw new ArgumentException($"The property {field} does not exist in the class {typeof(T).Name}.");

        var parameter = Expression.Parameter(typeof(T), "p");
        var propertyAccess = Expression.Property(parameter, propertyInfo);
        var orderByExpression = Expression.Lambda<Func<T, object>>(Expression.Convert(propertyAccess, typeof(object)), parameter);

        if (sortingType == SortingType.ASC)
        {
            query = query.OrderBy(orderByExpression);
        }
        else if (sortingType == SortingType.DESC)
        {
            query = query.OrderByDescending(orderByExpression);
        }

        return query;
    }
}
