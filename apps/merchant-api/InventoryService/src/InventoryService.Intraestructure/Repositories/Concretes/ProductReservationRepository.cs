using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;

namespace InventoryService.Intraestructure.Repositories.Concretes;

public class ProductReservationRepository(InventoryDbContext context) : BaseRepository<ProductReservation>(context) { }