using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using ReviewService.Concretes;
using ReviewService.Infrastructure.Context;

namespace ReviewService.Api.Configuration;

public static class ConfigDb
{
    public static IServiceCollection ConfigDbSet(this IServiceCollection services, string connectionString)
    {
        var client = new MongoClient(connectionString);
        var db = ReviewContextMongoDb.Create(client.GetDatabase("reviews_db"));
        services.AddScoped<DbSet<ProductReview>>(_ => db.Reviews);
        return services;
    }
}