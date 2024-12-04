using Microsoft.EntityFrameworkCore;
using PaymentService.Commons.Params;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Data;
using PaymentService.Infrastructure.Repositories.Bases;
using PaymentService.Infrastructure.Repositories.Interfaces;
using PaymentService.Infrastructure.Repositories.QueryExtenssionMethods;

namespace PaymentService.Infrastructure.Repositories.Concretes;

public class OrderRepository(PaymentDbContext context) : BaseRepository<Order>(context), IOrderRepository
{
    public override async Task<IEnumerable<Order>> GetAllAsync(int pageNumber, int pageSize)
    {
        return await DbSet
            .Where(e => e.IsActive)
            .AsSplitQuery()
            .Include(o => o.OrderItems)
            .Include(o => o.PaymentTransaction)
            .OrderBy(c => c.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<IEnumerable<Order>> GetAllOrdersBySpecificUserAsync(Guid userId, 
        OrderFilterParameters parameters, int pageNumber, int pageSize)
    {
        return await DbSet
            .Where(e => 
                e.IsActive && 
                e.UserId == userId)
            .ApplyFilters(parameters)
            .AsSplitQuery()
            .Include(o => o.OrderItems)
            .Include(o => o.PaymentTransaction)
            .OrderBy(c => c.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();    
    }
    
    public async Task<int> GetCountBySpecificUserAsync(Guid userId, OrderFilterParameters parameters)
    {
        return await DbSet.Where(e => 
                e.IsActive && 
                e.UserId == userId)
            .ApplyFilters(parameters)
            .CountAsync();    
    }
}