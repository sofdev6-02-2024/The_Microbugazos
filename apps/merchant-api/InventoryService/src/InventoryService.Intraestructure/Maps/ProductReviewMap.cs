using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InventoryService.Intraestructure.Maps;

public class ProductReviewMap : IEntityTypeConfiguration<ProductReview>
{
    public void Configure(EntityTypeBuilder<ProductReview> builder)
    {
        builder.ToTable("ProductReview");
        builder.HasKey(pr => pr.Id);
        builder.Property(pr => pr.Id).ValueGeneratedOnAdd();

        builder.Property(pr => pr.Comment)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(pr => pr.Rating)
            .IsRequired();

        builder.HasOne(pr => pr.Product)
            .WithMany(p => p.ProductReviews)
            .HasForeignKey(pr => pr.ProductId)
            .OnDelete(DeleteBehavior.Cascade); 
    }
}