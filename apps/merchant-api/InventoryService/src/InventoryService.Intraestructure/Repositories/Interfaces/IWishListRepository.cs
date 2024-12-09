using InventoryService.Commons.Params;
using InventoryService.Domain.Concretes;

namespace InventoryService.Intraestructure.Repositories.Interfaces;

public interface IWishListRepository : IRepository<WishList>
{
    public Task<IEnumerable<WishList>> GetWishListByUserId(Guid userId, int pageNumber, int pageSize, 
        ProductFilteringQueryParams? queryParams = null);
    public Task<int> GetWishListCountByUserId(Guid userId, ProductFilteringQueryParams? queryParams = null);
    public Task<WishList?> GetByUserIdAndProductIdAsync(Guid userId, Guid productId);
}