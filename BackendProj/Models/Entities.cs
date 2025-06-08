// Models/Entities.cs  (veya ayrı her bir model için kendi .cs dosyanı kullanabilirsin)
using System;
using System.Collections.Generic;

namespace BackendProj.Models
{
    public class Category
    {
        public int    Id          { get; set; }
        public string Name        { get; set; }
        public string Description { get; set; }

        // Navigation
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }

    public class Product
    {
        public int      Id          { get; set; }
        public string   Name        { get; set; }
        public string   Description { get; set; }
        public decimal  Price       { get; set; }
        public int      Stock       { get; set; }

        // FK ve navigation
        public int      CategoryId  { get; set; }
        public Category Category    { get; set; }

        // Reverse navigation: CartItem, OrderItem, WishListItem
        public ICollection<CartItem>     CartItems     { get; set; } = new List<CartItem>();
        public ICollection<OrderItem>    OrderItems    { get; set; } = new List<OrderItem>();
        public ICollection<WishListItem> WishListItems { get; set; } = new List<WishListItem>();
    }

    public class Cart
    {
        public int    Id     { get; set; }
        public string UserId { get; set; }

        public ICollection<CartItem> Items { get; set; } = new List<CartItem>();
    }

    public class CartItem
    {
        public int     Id        { get; set; }
        public int     CartId    { get; set; }
        public Cart    Cart      { get; set; }
        public int     ProductId { get; set; }
        public Product Product   { get; set; }
        public int     Quantity  { get; set; }
    }

    public class Order
    {
        public int    Id           { get; set; }
        public string UserId       { get; set; }
        public DateTime OrderDate  { get; set; }
        public string Status       { get; set; }
        public decimal TotalAmount { get; set; }

        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }

    public class OrderItem
    {
        public int     Id        { get; set; }
        public int     OrderId   { get; set; }
        public Order   Order     { get; set; }
        public int     ProductId { get; set; }
        public Product Product   { get; set; }
        public int     Quantity  { get; set; }
        public decimal Price     { get; set; }
    }

    public class WishListItem
    {
        public int      Id         { get; set; }
        public string   UserId     { get; set; }
        public DateTime DateAdded  { get; set; }
        public int      ProductId  { get; set; }
        public Product  Product    { get; set; }
    }
}
