using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using PaymentService.Api;
using PaymentService.Application;
using PaymentService.Infrastructure.Data;
using RabbitMQMessaging.Extensions;

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
builder.Services.AddHttpClient();

var connectionString = builder.Configuration["POSTGRES_SQL_CONNECTION"] ?? 
                       throw new ArgumentNullException("POSTGRES_SQL_CONNECTION environment variable is not set.");
builder.Services.AddDbContext<PaymentDbContext>(options =>
    options.UseNpgsql(connectionString,
            b => b.MigrationsAssembly("PaymentService.Api"))
        .EnableSensitiveDataLogging(false)
        .LogTo(Console.WriteLine, LogLevel.Information)
);

builder.Services
       .AddControllers(options =>
       {
           options.Filters.Add(new ProducesAttribute("application/json"));
       });

var app = builder.Build();

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
