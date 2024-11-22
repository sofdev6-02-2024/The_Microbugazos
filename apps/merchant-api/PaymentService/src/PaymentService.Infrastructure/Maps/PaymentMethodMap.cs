using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PaymentService.Domain.Entities.Concretes;

namespace PaymentService.Infrastructure.Maps;

public class PaymentMethodMap : IEntityTypeConfiguration<PaymentMethod>
{
    public void Configure(EntityTypeBuilder<PaymentMethod> builder)
    {
        builder.ToTable("PaymentMethod");
        builder.HasIndex(o => o.Id);
        builder.Property(o => o.Id).ValueGeneratedOnAdd();
        builder.Property(o => o.Name).IsRequired();

        builder.HasOne(pm => pm.PaymentTransaction)
            .WithOne(pt => pt.PaymentMethod)
            .HasForeignKey<PaymentTransaction>(pt => pt.PaymentMethodId);
    }
}