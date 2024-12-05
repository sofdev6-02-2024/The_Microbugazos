using MongoDB.Driver;
using ReviewService.Concretes;
using ReviewService.Infrastructure.Context.Interfaces;

namespace ReviewService.Infrastructure.Context.Concretes;

public class ProductReviewContext(IMongoDatabase database) : IContext<ProductReview>
{
    public IMongoCollection<ProductReview> Collection { get; set; }
        = database.GetCollection<ProductReview>("product_review");
}