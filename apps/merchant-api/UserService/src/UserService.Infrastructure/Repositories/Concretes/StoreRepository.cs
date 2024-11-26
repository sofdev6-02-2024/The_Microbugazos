using Microsoft.EntityFrameworkCore;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Abstract;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Infrastructure.Repositories.Concretes;

public class StoreRepository(DbContext context) : BaseRepository<Store>(context), IStoreRepository
{
    public async Task<Store?> GetStoreForSellerAsync(Guid sellerId)
    {
        var stores = await context.Set<Store>().ToListAsync();
        
        return stores.FirstOrDefault(store => 
            store.SellerIds != null && 
            store.SellerIds.Contains(sellerId));
    }
}