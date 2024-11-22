namespace InventoryService.Domain.Params;

public class FilteringQueryParams
{
    public Guid? CategoryId { get; set; }
    public double? MinPrice { get; set; }
    public double? MaxPrice { get; set; }
    public float? MinRating { get; set; }
    public float? MaxRating { get; set; }
    public string? SortBy { get; set; }
    public string? SortOrder { get; set; } = "asc";
}