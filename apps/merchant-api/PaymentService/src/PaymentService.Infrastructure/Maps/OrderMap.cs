using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PaymentService.Domain.Entities.Concretes;

namespace PaymentService.Infrastructure.Maps;

public class OrderMap : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Order");
        builder.HasIndex(o => o.Id);
        builder.Property(o => o.Id).ValueGeneratedOnAdd();
        builder.Property(o => o.OrderStatus).IsRequired();
        builder.Property(o => o.TotalPrice).IsRequired();

        builder.HasMany(o => o.OrderItems)
            .WithOne(oi => oi.Order)
            .HasForeignKey(oi => oi.OrderId);

        builder.HasOne(o => o.PaymentTransaction)
            .WithOne(pt => pt.Order)
            .HasForeignKey<PaymentTransaction>(pt => pt.OrderId);
    }
}