using Microsoft.EntityFrameworkCore;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Data;
using PaymentService.Infrastructure.Repositories.Bases;

namespace PaymentService.Infrastructure.Repositories.Concretes;

public class PaymentMethodRepository(PaymentDbContext context) : BaseRepository<PaymentMethod>(context)
{
    public override async Task<PaymentMethod> AddAsync(PaymentMethod entity)
    {
        var existingPaymentMethod = await DbSet.FirstOrDefaultAsync(c => c.Name == entity.Name && c.IsActive);
        if (existingPaymentMethod != null) return existingPaymentMethod; 
        
        await DbSet.AddAsync(entity);
        await Context.SaveChangesAsync();
        return entity;
    }
}