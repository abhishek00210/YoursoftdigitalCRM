using CrmBackendApi.Data;
using Microsoft.EntityFrameworkCore;
using CrmBackendApi.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Controllers (Required for your Login/Signup APIs to work)
builder.Services.AddControllers();

// 2. Configure Database
// Ensure "ConnectionStrings": { "DefaultConnection": "Data Source=crm.db" } is in appsettings.json
builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=crm.db"));

// 3. Configure CORS (Crucial: Allows React to talk to .NET)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            // Allow requests from your React Frontend
            // We include port 5173 (default) and 5174 (if you have multiple terminals open)
            policy.WithOrigins("http://localhost:5173", 
                    "http://localhost:5174", 
                    "http://localhost:8080")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// 4. Add Swagger (Optional, good for testing)
builder.Services.AddSingleton<IKanbanStore, JsonFileKanbanStore>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 5. Enable CORS (Must be placed BEFORE UseAuthorization)
app.UseCors("AllowReactApp");

app.UseAuthorization();
app.UseStaticFiles();
// 6. Activate the Controllers
app.MapControllers();

app.Run();