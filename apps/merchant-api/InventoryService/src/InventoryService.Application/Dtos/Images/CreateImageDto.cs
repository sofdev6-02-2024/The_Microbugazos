namespace InventoryService.Application.Dtos.Images;

public class CreateImageDto
{
    public Guid ProductId { get; set; }
    public string AltText { get; set; }
    public string Url { get; set; }
}