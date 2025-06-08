using BackendProj.DTOs;
using BackendProj.Models;

namespace BackendProj.Extensions
{
    public static class MappingExtensions
    {
        public static ProductDto AsDto(this Product product)
        {
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price
            };
        }
    }
}
