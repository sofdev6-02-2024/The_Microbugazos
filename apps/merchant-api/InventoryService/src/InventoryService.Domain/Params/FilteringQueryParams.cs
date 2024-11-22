namespace InventoryService.Domain.Params;

public class FilteringQueryParams
{
    public Guid? CategoryId { get; set; }
    public double? MinPrice { get; set; }
    public double? MaxPrice { get; set; }
    public float? MinRating { get; set; }
    public float? MaxRating { get; set; }
    public bool? NameAsc { get; set; }
    public bool? PriceAsc { get; set; }
    public bool? RatingAsc { get; set; }
}