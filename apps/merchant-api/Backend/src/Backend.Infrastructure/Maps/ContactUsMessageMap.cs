using Backend.Domain.Entities.Concretes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infrastructure.Maps;

public class ContactUsMessageMap : IEntityTypeConfiguration<ContactUsMessage>
{
    public void Configure(EntityTypeBuilder<ContactUsMessage> builder)
    {
        builder.ToTable("ContactUsMessage");
        builder.HasIndex(o => o.Id);
        builder.Property(o => o.Id).ValueGeneratedOnAdd();
        builder.Property(o => o.Name).IsRequired();
        builder.Property(o => o.Email).IsRequired();
        builder.Property(o => o.Message).IsRequired();
    }
}