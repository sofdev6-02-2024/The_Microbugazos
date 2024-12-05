using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using ReviewService.Concretes;
using ReviewService.Infrastructure.Maps;

namespace ReviewService.Infrastructure.Context;

public class ReviewContextMongoDb : DbContext
{
    public DbSet<ProductReview> Reviews { get; init; }
        
    public static ReviewContextMongoDb Create(IMongoDatabase database) =>
        new(new DbContextOptionsBuilder<ReviewContextMongoDb>()
            .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
            .Options);
    public ReviewContextMongoDb(DbContextOptions options)
        : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new ProductReviewMap());
    }
}