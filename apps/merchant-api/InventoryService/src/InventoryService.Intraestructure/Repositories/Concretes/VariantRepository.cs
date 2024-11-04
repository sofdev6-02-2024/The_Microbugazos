using InventoryService.Intraestructure.Data;
using InventoryService.Intraestructure.Repositories.Bases;
using InventoryService.Domain.Concretes;
using Microsoft.EntityFrameworkCore;

namespace InventoryService.Intraestructure.Repositories.Concretes;

public class VariantRepository(InventoryDbContext context) : BaseRepository<Variant>(context)
{
    public override async Task<Variant> AddAsync(Variant entity)
    {
        var existingVariant = await DbSet.FirstOrDefaultAsync(v => v.Name.ToLower() == entity.Name.ToLower() && v.IsActive);
        if (existingVariant != null) return existingVariant; 
        
        await DbSet.AddAsync(entity);
        await Context.SaveChangesAsync();
        return entity;
    }
    
    public override async Task<Variant?> GetByIdAsync(Guid id)
    {
        return await DbSet
            .Include(c => c.ProductAttributes)
            .ThenInclude(pa => pa.ProductVariant)
            .FirstOrDefaultAsync(c => c.Id == id);  
    }

    public override async Task<IEnumerable<Variant>> GetAllAsync()
    {
        return await DbSet
            .Where(e => e.IsActive)
            .Include(c => c.ProductAttributes)          
            .ToListAsync();
    }
}