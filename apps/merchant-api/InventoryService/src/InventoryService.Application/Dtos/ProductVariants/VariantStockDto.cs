namespace InventoryService.Application.Dtos.ProductVariants;

public class VariantStockDto
{
    public Guid VariantId { get; set; } = Guid.Empty;
    public int Quantity { get; set; } = 0;
}