using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;
using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Intraestructure.Repositories.Concretes;

public class CategoryRepository(InventoryDbContext context) : BaseRepository<Category>(context)
{
    public override async Task<Category> AddAsync(Category entity)
    {
        var existingCategory = await DbSet.FirstOrDefaultAsync(c => c.Name == entity.Name && c.IsActive);
        if (existingCategory != null) return existingCategory; 
        
        await DbSet.AddAsync(entity);
        await Context.SaveChangesAsync();
        return entity;
    }

    public override async Task<Category?> GetByIdAsync(Guid id)
    {
        return await DbSet
            .Where(e => e.IsActive)
            .Include(c => c.ParentCategory)          
            .Include(c => c.SubCategories)
            .Include(c => c.Products)
            .FirstOrDefaultAsync(c => c.Id == id);  
    }

    public override async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await DbSet
            .Where(e => e.IsActive)
            .Include(c => c.ParentCategory)       
            .Include(c => c.SubCategories)          
            .OrderBy(c => c.CreatedAt) 
            .ToListAsync();
    }
}