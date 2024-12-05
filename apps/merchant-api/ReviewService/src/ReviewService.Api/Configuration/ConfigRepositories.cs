using ReviewService.Concretes;
using ReviewService.Infrastructure.Repositories.Concretes;
using ReviewService.Infrastructure.Repositories.Interfaces;

namespace ReviewService.Api.Configuration;

public static class ConfigRepositories
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        return services.AddScoped<IRepository<ProductReview>, ProductReviewRepository>();
    }
}