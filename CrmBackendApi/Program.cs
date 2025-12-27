using CrmBackendApi.Data;
using CrmBackendApi.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// 1️⃣ Add Controllers + FIX circular reference issue (🔥 REQUIRED)
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
);

// 2️⃣ Configure Database (SQLite)
builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
        ?? "Data Source=crm.db"
    )
);

// 3️⃣ Configure CORS (React ↔ .NET)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:8080"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// 4️⃣ Swagger
builder.Services.AddSingleton<IKanbanStore, JsonFileKanbanStore>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 5️⃣ Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.UseStaticFiles();

// 6️⃣ Map Controllers (🔥 REQUIRED)
app.MapControllers();

app.Run();
