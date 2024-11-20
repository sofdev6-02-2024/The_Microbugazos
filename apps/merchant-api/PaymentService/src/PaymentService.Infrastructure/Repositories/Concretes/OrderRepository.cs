using Microsoft.EntityFrameworkCore;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Data;
using PaymentService.Infrastructure.Repositories.Bases;

namespace PaymentService.Infrastructure.Repositories.Concretes;

public class OrderRepository(PaymentDbContext context) : BaseRepository<Order>(context)
{
    public override async Task<IEnumerable<Order>> GetAllAsync(int pageNumber, int pageSize)
    {
        return await DbSet
            .Where(e => e.IsActive)
            .AsSplitQuery()
            .Include(o => o.OrderItems)
            .OrderBy(c => c.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }
}