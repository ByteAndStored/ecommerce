using System.Collections.Generic;
using System.Threading.Tasks;
using BackendProj.Data;
using BackendProj.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendProj.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _db;
        public ProductRepository(AppDbContext db) => _db = db;

        public async Task<IEnumerable<Product>> GetAllAsync()
            => await _db.Products.Include(p => p.Category).ToListAsync();

        public async Task<Product> GetByIdAsync(int id)
            => await _db.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id)
               ?? throw new KeyNotFoundException($"Product {id} bulunamadı.");

        public async Task<Product> AddAsync(Product entity)
        {
            _db.Products.Add(entity);
            await _db.SaveChangesAsync();
            return entity;
        }

        public async Task UpdateAsync(Product entity)
        {
            if (!await _db.Products.AnyAsync(p => p.Id == entity.Id))
                throw new KeyNotFoundException($"Product {entity.Id} bulunamadı.");

            _db.Entry(entity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _db.Products.FindAsync(id)
                          ?? throw new KeyNotFoundException($"Product {id} bulunamadı.");
            _db.Products.Remove(product);
            await _db.SaveChangesAsync();
        }
    }
}
