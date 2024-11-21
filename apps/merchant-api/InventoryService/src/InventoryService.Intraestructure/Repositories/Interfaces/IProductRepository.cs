using InventoryService.Domain.Concretes;
using InventoryService.Domain.Params;

namespace InventoryService.Intraestructure.Repositories.Interfaces;

public interface IProductRepository : IRepository<Product>
{ 
    Task<IEnumerable<Product>> GetProductsByStore(Guid id, int pageNumber, int pageSize, FilteringQueryParams queryParams);
    Task<int> GetCountProductsByStore(Guid id, int pageNumber, int pageSize, FilteringQueryParams queryParams);
}