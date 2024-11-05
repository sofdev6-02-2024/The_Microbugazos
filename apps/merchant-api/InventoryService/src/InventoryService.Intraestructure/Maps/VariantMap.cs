using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InventoryService.Intraestructure.Maps;

public class VariantMap : IEntityTypeConfiguration<Variant>
{
    public void Configure(EntityTypeBuilder<Variant> builder)
    {
        builder.ToTable("Variant");
        builder.HasKey(v => v.Id);
        builder.Property(p => p.Name).IsRequired();
        builder.Property(v => v.Id).ValueGeneratedOnAdd();

        builder.HasQueryFilter(v => v.IsActive);

        builder.Property(v => v.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasMany(v => v.ProductAttributes)
            .WithOne(pa => pa.Variant)
            .HasForeignKey(pa => pa.VariantId) 
            .OnDelete(DeleteBehavior.Cascade); 
    }
}