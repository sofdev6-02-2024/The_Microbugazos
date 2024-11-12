using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InventoryService.Intraestructure.Maps;

public class ProductAttributeMap : IEntityTypeConfiguration<ProductAttribute>
{
    public void Configure(EntityTypeBuilder<ProductAttribute> builder)
    {
        builder.ToTable("ProductAttribute");
        builder.HasIndex(pa => pa.Id);
        builder.Property(pa => pa.Id).ValueGeneratedOnAdd();
        builder.Property(p => p.Value).IsRequired();
        builder.Property(pa => pa.Value).IsRequired();

        builder.HasQueryFilter(pa => pa.IsActive);
        
        builder.HasOne(pa => pa.ProductVariant)
            .WithMany(pv => pv.Attributes)
            .HasForeignKey(pa => pa.ProductVariantId);
        
        builder.HasOne(pa => pa.Variant)
            .WithMany(v => v.ProductAttributes)
            .HasForeignKey(pa => pa.VariantId);
    }
}