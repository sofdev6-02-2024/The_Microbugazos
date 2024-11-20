using Microsoft.EntityFrameworkCore;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Data;
using PaymentService.Infrastructure.Repositories.Bases;

namespace PaymentService.Infrastructure.Repositories.Concretes;

public class PaymentTransactionRepository(PaymentDbContext context) : BaseRepository<PaymentTransaction>(context)
{
    public override async Task<IEnumerable<PaymentTransaction>> GetAllAsync(int pageNumber, int pageSize)
    {
        return await DbSet
            .Where(e => e.IsActive)
            .AsSplitQuery()
            .Include(p => p.PaymentMethod)
            .OrderBy(c => c.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }
}
