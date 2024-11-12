using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UserService.Domain.Concretes;
using UserService.Domain.Entities.Concretes;
using User = UserService.Domain.Entities.Concretes.User;
using UserAddress = UserService.Domain.Entities.Concretes.UserAddress;

namespace UserService.Infrastructure.Maps;

public class UserMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("User");
        builder.HasIndex(u => u.Id);
        builder.Property(u => u.Id).ValueGeneratedOnAdd();
        builder.Property(u => u.Name).IsRequired();
        builder.Property(u => u.Email).IsRequired();
        builder.Property(u => u.UserType)
            .IsRequired()
            .HasConversion<int>();

        builder.HasOne(u => u.Address)
            .WithOne(ua => ua.User)
            .HasForeignKey<UserAddress>(ua => ua.UserId);


        builder.HasOne(u => u.Store)
        .WithOne(ua => ua.User)
        .HasForeignKey<Store>(st => st.UserId);
    }
}
