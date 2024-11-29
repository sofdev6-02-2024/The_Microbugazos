namespace InventoryService.Application.Dtos.ProductVariants;

public class VariantStockDto
{
    public Guid VariantId { get; set; } = Guid.Empty;
    public int QuantityToReduce { get; set; } = 0;
}