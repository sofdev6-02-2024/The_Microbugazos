using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InventoryService.Intraestructure.Maps;

public class InventoryReservationMap : IEntityTypeConfiguration<InventoryReservation>
{
    public void Configure(EntityTypeBuilder<InventoryReservation> builder)
    {
        builder.ToTable("InventoryReservation");
        builder.HasIndex(oi => oi.Id);
        builder.Property(oi => oi.Id).ValueGeneratedOnAdd();
        builder.Property(oi => oi.ClientId).IsRequired();
        builder.Property(oi => oi.SavedDate).IsRequired();
        builder.Property(oi => oi.ReservationStatus).IsRequired().HasConversion<int>();

        builder.HasMany(oi => oi.Products)
            .WithOne(pr => pr.InventoryReservation)
            .HasForeignKey(pr => pr.InventoryReservationId);
    }
}