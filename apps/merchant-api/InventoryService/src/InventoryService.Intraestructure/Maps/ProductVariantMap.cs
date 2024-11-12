using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InventoryService.Intraestructure.Maps;

public class ProductVariantMap : IEntityTypeConfiguration<ProductVariant>
{
    public void Configure(EntityTypeBuilder<ProductVariant> builder)
    {
        builder.ToTable("ProductVariant");
        builder.HasKey(pv => pv.Id);
        builder.Property(pv => pv.Id).ValueGeneratedOnAdd();
        builder.Property(pv => pv.PriceAdjustment).IsRequired();
        builder.Property(pv => pv.StockQuantity).IsRequired();
        
        builder.HasOne(pv => pv.Product)
            .WithMany(p => p.ProductVariants)
            .HasForeignKey(pv => pv.ProductId);

        builder.HasOne(pv => pv.Image)
            .WithOne(i => i.ProductVariant)
            .HasForeignKey<ProductVariant>(pv => pv.ImageId);
    }
}