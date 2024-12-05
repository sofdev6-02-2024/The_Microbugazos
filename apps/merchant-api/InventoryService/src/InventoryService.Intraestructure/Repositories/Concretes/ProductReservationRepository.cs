using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;
using InventoryService.Intraestructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Intraestructure.Repositories.Concretes;

public class ProductReservationRepository(InventoryDbContext context) : BaseRepository<ProductReservation>(context), IProductReservationRepository
{
    public async Task<IEnumerable<ProductReservation>> GetAllByInventoryIdAsync(Guid inventoryId)
    {
        return await DbSet.Where(pr => pr.InventoryReservationId == inventoryId).ToListAsync();
    }
}