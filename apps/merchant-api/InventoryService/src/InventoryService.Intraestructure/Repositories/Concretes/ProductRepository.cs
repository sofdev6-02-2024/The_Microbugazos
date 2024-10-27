using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;
using InventoryService.Domain.Concretes;

namespace InventoryService.Intraestructure.Repositories.Concretes;

public class ProductRepository(InventoryDbContext context) : BaseRepository<Product>(context);