using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;
using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Intraestructure.Repositories.Concretes;

public class CategoryRepository(InventoryDbContext context) : BaseRepository<Category>(context)
{
    public override async Task<Category?> GetByIdAsync(Guid id)
    {
        return await DbSet
            .Include(c => c.ParentCategory)          
            .Include(c => c.SubCategories)         
            .FirstOrDefaultAsync(c => c.Id == id);  
    }

    public override async Task<IEnumerable<Category>> GetAllAsync(int pageNumber, int pageSize)
    {
        return await DbSet
            .Where(e => e.IsActive)
            .Include(c => c.ParentCategory)       
            .Include(c => c.SubCategories)          
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }
}