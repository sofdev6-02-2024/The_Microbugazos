using InventoryService.Domain.Concretes;

namespace InventoryService.Intraestructure.Repositories.Interfaces;

public interface IProductReservationRepository : IRepository<ProductReservation>
{
    Task<IEnumerable<ProductReservation>> GetAllByInventoryIdAsync(Guid inventoryId);
}