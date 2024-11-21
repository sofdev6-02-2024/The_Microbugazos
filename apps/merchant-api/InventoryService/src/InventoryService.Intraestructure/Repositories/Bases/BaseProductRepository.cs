using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Intraestructure.Repositories.Bases;

public abstract class BaseProductRepository(DbContext context) : BaseRepository<Product>(context), IProductRepository
{
    public abstract Task<IEnumerable<Product>> GetProductsByStore(Guid id, int pageNumber, int pageSize);
}