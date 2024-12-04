using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InventoryService.Intraestructure.Maps;

public class ProductReservationMap : IEntityTypeConfiguration<ProductReservation>
{
    public void Configure(EntityTypeBuilder<ProductReservation> builder)
    {
        builder.ToTable("ProductReservation");
        builder.HasIndex(pr => pr.Id);
        builder.Property(pr => pr.Id).ValueGeneratedOnAdd();
        builder.Property(pr => pr.ProductVariantId).IsRequired();
        builder.Property(pr => pr.Quantity).IsRequired();

        builder.HasOne(pr => pr.InventoryReservation)
            .WithMany(ir => ir.ProductReservations)
            .HasForeignKey(pr => pr.InventoryReservationId);
    }
}