// Program.cs
using CrmBackendApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Services
builder.Services.AddControllers(); // Enable Controllers (API endpoints)

// 2. Configure Database (SQLite)
// Ensure your appsettings.json has "ConnectionStrings": { "DefaultConnection": "Data Source=crm.db" }
builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=crm.db"));

// 3. Configure CORS (Allows React localhost:5173 to talk to .NET)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:5174") // Add your React port here
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// 4. Swagger/OpenAPI (for testing)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 5. Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 6. Enable CORS
app.UseCors("AllowReactApp");

app.UseAuthorization();

// 7. Map Controllers (This makes your API endpoints work)
app.MapControllers();

app.Run();