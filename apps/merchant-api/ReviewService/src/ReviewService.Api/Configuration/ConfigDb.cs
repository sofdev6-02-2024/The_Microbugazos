using MongoDB.Driver;
using ReviewService.Concretes;
using ReviewService.Infrastructure.Context.Concretes;
using ReviewService.Infrastructure.Context.Interfaces;

namespace ReviewService.Api.Configuration;

public static class ConfigDb
{
    public static IServiceCollection ConfigDbSet(this IServiceCollection services, string connectionString)
    {
        var client = new MongoClient(connectionString);
        var db = client.GetDatabase("reviews_db");
        
        services.AddScoped<IMongoDatabase>(_ => db);
        services.ConfigContext();
        return services;
    }

    public static IServiceCollection ConfigContext(this IServiceCollection services)
    {
        services.AddScoped<IContext<ProductReview>, ProductReviewContext>();
        return services;
    }
}