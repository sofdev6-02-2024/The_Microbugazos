using InventoryService.Commons.Params;
using InventoryService.Domain.Concretes;
namespace InventoryService.Intraestructure.Repositories.Interfaces;


public interface IProductRepository : IRepository<Product>
{

    Task<IEnumerable<Product>> GetProductsByStoreId(Guid id, int pageNumber, int pageSize, ProductFilteringQueryParams queryParams);
    Task<int> GetCountProductsByStoreId(Guid id, ProductFilteringQueryParams queryParams);
}