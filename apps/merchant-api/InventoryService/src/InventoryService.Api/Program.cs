using InventoryService.Api;
using DotNetEnv;
using InventoryService.Intraestructure.Data;
using InventoryService.Application;
using InventoryService.Application.Profiles;
using InventoryService.Application.ValidatorSettings;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
Env.Load("../../../.env");
var apiGatewayUrl = builder.Configuration["ApiGatewayUrl"] ?? "http://localhost:5001";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policyBuilder => policyBuilder
            .WithOrigins(apiGatewayUrl)
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Configuration.AddEnvironmentVariables();
builder.Services.AddEndpointsApiExplorer();
builder.Services.ConfigureSwagger();
builder.Services.AddApplication();


builder.Configuration.AddJsonFile("validationSettings.json", optional: false, reloadOnChange: true);
builder.Services.Configure<ValidationSettings>(builder.Configuration);

builder.Services.AddMediatR(cfg=>cfg.RegisterServicesFromAssemblies(typeof(ProductProfile).Assembly));
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


var connectionString = builder.Configuration["POSTGRES_SQL_CONNECTION"] ?? throw new ArgumentNullException("POSTGRES_SQL_CONNECTION environment variable is not set.");
builder.Services.AddDbContext<DbContext, InventoryDbContext>(options =>
    options.UseNpgsql(connectionString,
            b => b.MigrationsAssembly("InventoryService.Api"))
        .LogTo(Console.WriteLine, LogLevel.Information)
);

builder.Services
       .AddControllers(options =>
       {
           options.Filters.Add(new ProducesAttribute("application/json"));
       });

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<InventoryDbContext>();
    dbContext.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.UseCors("AllowApiGateway");
app.UseAuthentication();
app.UseAuthorization();

app.Run();
