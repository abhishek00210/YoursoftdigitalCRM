// Data/DesignTimeDbContextFactory.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System.IO; // Required for Path

namespace CrmBackendApi.Data
{
    // This class is used ONLY by the 'dotnet ef' command-line tool
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApiDbContext>
    {
        public ApiDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApiDbContext>();
            
            // This tells the tool to use the "crm.db" file
            // in the main project directory
            var connectionString = "Data Source=" + Path.Combine(Directory.GetCurrentDirectory(), "crm.db");
            
            optionsBuilder.UseSqlite(connectionString);

            return new ApiDbContext(optionsBuilder.Options);
        }
    }
}