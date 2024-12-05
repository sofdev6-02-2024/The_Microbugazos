using Microsoft.EntityFrameworkCore;
using ReviewService.Concretes;
using ReviewService.Infrastructure.Repositories.Bases;
using ReviewService.Infrastructure.Repositories.Interfaces;

namespace ReviewService.Infrastructure.Repositories.Concretes;

public class ProductReviewRepository(DbSet<ProductReview> dbSet) : BaseRepository<ProductReview>(dbSet)
{
    
}