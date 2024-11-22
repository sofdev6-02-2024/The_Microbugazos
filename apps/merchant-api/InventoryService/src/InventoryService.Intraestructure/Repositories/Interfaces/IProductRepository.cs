using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Types;

namespace InventoryService.Intraestructure.Repositories.Interfaces;


public interface IProductRepository : IRepository<Product>
{
    Task<IEnumerable<Product>> GetProductByStoreId(
             Guid storeId,
             int page,
             int pageSize,
             List<(string, SortingType)> sorting);
}