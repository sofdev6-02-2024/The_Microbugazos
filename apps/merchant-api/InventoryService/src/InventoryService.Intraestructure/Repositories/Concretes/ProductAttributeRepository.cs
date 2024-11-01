using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;
using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Intraestructure.Repositories.Concretes;

public class ProductAttributeRepository(InventoryDbContext context) : BaseRepository<ProductAttribute>(context)
{
    public override async Task<ProductAttribute> AddAsync(ProductAttribute entity)
    {
        var existingCategory = await DbSet.FirstOrDefaultAsync(c => c.Value.ToLower() == entity.Value.ToLower() && c.IsActive);
        if (existingCategory != null) return existingCategory; 
        
        await DbSet.AddAsync(entity);
        await Context.SaveChangesAsync();
        return entity;
    }

    public override async Task<ProductAttribute?> GetByIdAsync(Guid id)
    {
        return await DbSet
            .Include(c => c.Variant)          
            .Include(c => c.ProductVariant)         
            .FirstOrDefaultAsync(c => c.Id == id);  
    }

    public override async Task<IEnumerable<ProductAttribute>> GetAllAsync()
    {
        return await DbSet
            .Where(e => e.IsActive)
            .Include(c => c.Variant)          
            .Include(c => c.ProductVariant)        
            .OrderBy(c => c.CreatedAt) 
            .ToListAsync();
    }

    public override async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        if (entity == null) return false;
        
        DbSet.Remove(entity);
        await Context.SaveChangesAsync();
        return true;
    }
}