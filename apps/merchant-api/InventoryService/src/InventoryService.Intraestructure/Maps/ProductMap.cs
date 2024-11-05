using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InventoryService.Intraestructure.Maps;

public class ProductMap : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Product");
        builder.HasIndex(p => p.Id);
        builder.Property(p => p.Id).ValueGeneratedOnAdd();
        builder.Property(p => p.Name).IsRequired();
        builder.Property(p => p.BasePrice).IsRequired();
        builder.Property(p => p.Brand).IsRequired();
        
        builder.HasQueryFilter(p => p.IsActive);
        
        builder.HasMany(p => p.Images)
            .WithOne(i => i.Product)
            .HasForeignKey(i => i.ProductId);

        builder.HasMany(p => p.ProductVariants)
            .WithOne(pv => pv.Product)
            .HasForeignKey(pv => pv.ProductId);

        builder.HasMany(p => p.Categories)
            .WithMany(c => c.Products);
    }
}