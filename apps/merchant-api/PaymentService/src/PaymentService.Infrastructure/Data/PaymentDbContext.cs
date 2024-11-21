using Microsoft.EntityFrameworkCore;

namespace PaymentService.Infrastructure.Data;

public class PaymentDbContext(DbContextOptions<PaymentDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(typeof(PaymentDbContext).Assembly);
        
        base.OnModelCreating(builder);
    }
}