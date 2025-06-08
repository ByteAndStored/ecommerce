using Microsoft.EntityFrameworkCore;
using BackendProj.Data;
using BackendProj.Repositories;
using BackendProj.Models;

var builder = WebApplication.CreateBuilder(args);

// 1) DbContext & DI
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IProductRepository, ProductRepository>();

builder.Services.AddControllers();
builder.Services.AddCors(policy =>
{
    policy.AddDefaultPolicy(p =>
        p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// 2) Auto-migrate & seed
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();

    // 1) Categories
    if (!db.Categories.Any())
    {
        for (int i = 1; i <= 30; i++)
        {
            db.Categories.Add(new Category
            {
                Name = $"Category {i}",
                Description = $"Description for category {i}"
            });
        }
        db.SaveChanges();
    }

    // 2) Products
    if (!db.Products.Any())
    {
        for (int i = 1; i <= 30; i++)
        {
            db.Products.Add(new Product
            {
                Name        = $"Product {i}",
                Description = $"Description for product {i}",
                Price       = 10m * i,
                Stock       = 100 + i,
                CategoryId  = ((i - 1) % 30) + 1
            });
        }
        db.SaveChanges();
    }

    // 3) Carts
    if (!db.Carts.Any())
    {
        for (int i = 1; i <= 30; i++)
        {
            db.Carts.Add(new Cart { UserId = $"user{i}" });
        }
        db.SaveChanges();
    }

    // 4) CartItems
    if (!db.CartItems.Any())
    {
        for (int i = 1; i <= 30; i++)
        {
            db.CartItems.Add(new CartItem
            {
                CartId    = ((i - 1) % 30) + 1,
                ProductId = ((i - 1) % 30) + 1,
                Quantity  = (i % 5) + 1
            });
        }
        db.SaveChanges();
    }

    // 5) Orders
    if (!db.Orders.Any())
    {
        for (int i = 1; i <= 30; i++)
        {
            db.Orders.Add(new Order
            {
                UserId      = $"user{i}",
                OrderDate   = DateTime.UtcNow.AddDays(-i),
                Status      = i % 2 == 0 ? "Completed" : "Pending",
                TotalAmount = (i * 20m)
            });
        }
        db.SaveChanges();
    }

    // 6) OrderItems
    if (!db.OrderItems.Any())
    {
        for (int i = 1; i <= 30; i++)
        {
            db.OrderItems.Add(new OrderItem
            {
                OrderId   = ((i - 1) % 30) + 1,
                ProductId = ((i - 1) % 30) + 1,
                Quantity  = (i % 3) + 1,
                Price     = 20m * (((i - 1) % 30) + 1)
            });
        }
        db.SaveChanges();
    }

    // 7) WishListItems
    if (!db.WishListItems.Any())
    {
        for (int i = 1; i <= 30; i++)
        {
            db.WishListItems.Add(new WishListItem
            {
                UserId    = $"user{i}",
                ProductId = ((i - 1) % 30) + 1,
                DateAdded = DateTime.UtcNow.AddDays(-i)
            });
        }
        db.SaveChanges();
    }
}

// 3) Middleware & run
app.UseCors();
app.MapControllers();
app.Run();
