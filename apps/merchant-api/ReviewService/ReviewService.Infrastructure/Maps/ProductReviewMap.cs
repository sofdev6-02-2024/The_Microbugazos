using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MongoDB.EntityFrameworkCore.Extensions;
using ReviewService.Concretes;

namespace ReviewService.Infrastructure.Maps;

public class ProductReviewMap : IEntityTypeConfiguration<ProductReview>
{
    public void Configure(EntityTypeBuilder<ProductReview> builder)
    {
        builder.ToCollection("ProductReview");
        
        builder.HasKey(pr => pr.Id);
        builder.Property(pr => pr.Id)
            .HasElementName("_id")
            .ValueGeneratedOnAdd();
        
        builder.Property(pr => pr.ProductId).IsRequired();
        builder.Property(pr => pr.IsActive);
        builder.Property(pr => pr.CreatedAt);
        builder.Property(pr => pr.DeletedAt);
        builder.Property(pr => pr.UpdatedAt);
        
        builder.HasMany(p => p.Reviews)
            .WithOne()
            .HasForeignKey("ProductReviewId");
    }
}