namespace InventoryService.Application.Dtos.Images;

public class ImageDto
{
    public Guid ImageId { get; set; }
    public Guid ProductId { get; set; }
    public string? AltText { get; set; }
    public string? Url { get; set; }
    public bool IsActive { get; set; }
}