using Backend.Domain.Entities.Concretes;
using Backend.Infrastructure.Repositories.Abstract;
using Backend.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories.Concretes;

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