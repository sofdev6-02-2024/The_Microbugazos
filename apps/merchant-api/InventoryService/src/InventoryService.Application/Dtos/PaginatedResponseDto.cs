namespace InventoryService.Application.Dtos;

public class PaginatedResponseDto<T>(List<T> items, int totalItems, int page, int pageSize)
{
    public List<T>? Items { get; set; } = items;
    public int TotalCount { get; set; } = items.Count;
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
    public int TotalItems { get; set; } = totalItems;
    public int TotalPages { get; set; } = (int)Math.Ceiling(totalItems / (double)pageSize);
}