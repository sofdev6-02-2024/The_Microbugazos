using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UserService.Domain.Entities.Concretes;

namespace UserService.Infrastructure.Maps;

public class StoreMap : IEntityTypeConfiguration<Store>
{
    public void Configure(EntityTypeBuilder<Store> builder)
    {
        builder.ToTable("Store");

        builder.HasKey(s => s.Id);
        builder.Property(s => s.Name)
            .IsRequired();
        builder.Property(s => s.Description)
            .IsRequired();
        builder.Property(s => s.Address)
            .IsRequired();
        builder.Property(s => s.PhoneNumber)
            .IsRequired();

        builder.HasOne(s => s.User)
            .WithOne(u => u.Store)
            .HasForeignKey<Store>(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(s => s.SellerIds)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(id => Guid.Parse(id))
                    .ToList()
            );
    }
}