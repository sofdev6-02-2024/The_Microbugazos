using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PaymentService.Domain.Entities.Concretes;

namespace PaymentService.Infrastructure.Maps;

public class OrderItemMap : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.ToTable("OrderItem");
        builder.HasIndex(oi => oi.Id);
        builder.Property(oi => oi.Id).ValueGeneratedOnAdd();
        builder.Property(oi => oi.Quantity).IsRequired();
        builder.Property(oi => oi.UnitPrice).IsRequired();
        builder.Property(oi => oi.DiscountPercent).IsRequired();
        builder.Property(oi => oi.TotalPrice).IsRequired();

        builder.HasOne(oi => oi.Order)
            .WithMany(o => o.OrderItems)
            .HasForeignKey(oi => oi.OrderId);
    }
}