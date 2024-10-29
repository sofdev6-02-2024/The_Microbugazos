using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UserService.Domain.Concretes;

namespace UserService.Infraestructure.Maps;

public class UserAddressMap : IEntityTypeConfiguration<UserAddress>
{
    public void Configure(EntityTypeBuilder<UserAddress> builder)
    {
        builder.ToTable("UserAddresses");
        builder.HasKey(ua => ua.Id);
        builder.Property(ua => ua.Id).IsRequired().ValueGeneratedNever();
        builder.Property(ua => ua.UserId).IsRequired();
        builder.Property(ua => ua.Latitude).IsRequired();
        builder.Property(ua => ua.Longitude).IsRequired();

        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(ua => ua.UserId)
            .OnDelete(DeleteBehavior.Cascade); 

        builder.HasQueryFilter(ua => ua.IsActive && ua.DeletedAt == null);
    }
}
