using ReviewService.Concretes;
using ReviewService.Infrastructure.Context.Interfaces;
using ReviewService.Infrastructure.Repositories.Bases;

namespace ReviewService.Infrastructure.Repositories.Concretes;

public class ProductReviewRepository(IContext<ProductReview> context) : BaseRepository<ProductReview>(context)
{
    
}