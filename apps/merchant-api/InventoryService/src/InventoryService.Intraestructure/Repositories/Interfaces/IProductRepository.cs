using InventoryService.Domain.Concretes;

namespace InventoryService.Intraestructure.Repositories.Interfaces;

public interface IProductRepository : IRepository<Product>
{ 
    Task<IEnumerable<Product>> GetProductsByStore(Guid id, int pageNumber, int pageSize);
}