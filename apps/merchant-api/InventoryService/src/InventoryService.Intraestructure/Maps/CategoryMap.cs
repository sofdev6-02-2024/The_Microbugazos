using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InventoryService.Intraestructure.Maps;

public class CategoryMap : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Category");
        builder.HasIndex(c => c.Id);
        builder.Property(c => c.Id).ValueGeneratedOnAdd();
        builder.Property(c => c.Name).IsRequired();

        builder.HasQueryFilter(c => c.IsActive);

        builder.HasMany(c => c.SubCategories)
            .WithOne(c => c.ParentCategory)
            .HasForeignKey(c => c.ParentCategoryId);

        builder.HasMany(c => c.Products)
            .WithMany(p => p.Categories);
    }
}