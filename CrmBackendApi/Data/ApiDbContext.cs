// Data/ApiDbContext.cs
using CrmBackendApi.Models; 
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Data
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; } 
        public DbSet<Client> Clients { get; set; }
        public DbSet<Expense> Expenses { get; set; }
    }
}