using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InventoryService.Intraestructure.Maps;

public class ImageMap : IEntityTypeConfiguration<Image>
{
    public void Configure(EntityTypeBuilder<Image> builder)
    {
        builder.ToTable("Image");
        builder.HasIndex(i => i.Id);
        builder.Property(i => i.Id).ValueGeneratedOnAdd();
        builder.Property(i => i.AltText).IsRequired();
        builder.Property(i => i.Url).IsRequired();

        builder.HasQueryFilter(i => i.IsActive);

        builder.HasOne(i => i.Product)
            .WithMany(p => p.Images)
            .HasForeignKey(i => i.ProductId);
        
        builder.HasOne(i => i.ProductVariant)
            .WithOne(pv => pv.Image)
            .HasForeignKey<ProductVariant>(pv => pv.ImageId);
    }
}