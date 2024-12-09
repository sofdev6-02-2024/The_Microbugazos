using MongoDB.Driver;
using ReviewService.Concretes;
using ReviewService.Infrastructure.Context.Interfaces;
using ReviewService.Infrastructure.Repositories.Bases;

namespace ReviewService.Infrastructure.Repositories.Concretes;

public class ProductReviewRepository(IContext<ProductReview> context) : BaseRepository<ProductReview>(context)
{
    private readonly IContext<ProductReview> _context = context;

    public override async Task<ProductReview?> GetByIdAsync(Guid id)
    {
        var filter = Builders<ProductReview>.Filter
            .Eq(entity => entity.ProductId, id);
        var entity = await _context.Collection.Find(filter).FirstOrDefaultAsync();
        return entity;
    }
}