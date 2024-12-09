using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InventoryService.Intraestructure.Maps;

public class WishListMap : IEntityTypeConfiguration<WishList>
{
    public void Configure(EntityTypeBuilder<WishList> builder)
    {
        builder.ToTable("WishLists");
        builder.HasKey(v => v.Id);
        builder.Property(v => v.Id).ValueGeneratedOnAdd();
        builder.Property(p => p.ProductId).IsRequired();
        builder.Property(p => p.UserId).IsRequired();

        builder.HasOne(v => v.Product)
            .WithMany(p => p.WishList)
            .HasForeignKey(pa => pa.ProductId) 
            .OnDelete(DeleteBehavior.Cascade);
    }
}