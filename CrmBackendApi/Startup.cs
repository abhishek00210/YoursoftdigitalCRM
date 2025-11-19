// Startup.cs
using CrmBackendApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method adds all your services
    public void ConfigureServices(IServiceCollection services)
    {
        // 1. Add CORS
        services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp", builder =>
            {
                // Use the IP address of your React app
                builder.WithOrigins("http://localhost:8080") 
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
        });

        // 2. Add Database Context
        services.AddDbContext<ApiDbContext>(options =>
            options.UseSqlite("Data Source=crm.db"));

        // 3. Add Controllers service
        services.AddControllers();
        
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "CrmBackendApi", Version = "v1" });
        });
    }

    // This method configures the app's request "pipeline"
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CrmBackendApi v1"));
        }

        // app.UseHttpsRedirection(); // We can comment this out for now

        app.UseRouting();

        // 4. Use CORS (must be in this specific order)
        app.UseCors("AllowReactApp");

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}