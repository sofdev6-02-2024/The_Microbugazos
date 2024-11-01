using InventoryService.Api;
using DotNetEnv;
using InventoryService.Intraestructure.Data;
using InventoryService.Application;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using RabbitMQ.Client;
using MerchantCommon.RabbitMqMessaging.Services;

var builder = WebApplication.CreateBuilder(args);



Env.Load("../../../.env");


string ApiGatewayUrl = builder.Configuration["ApiGatewayUrl"] ?? "http://localhost:5001";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policyBuilder => policyBuilder
            .WithOrigins(ApiGatewayUrl)
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Configuration.AddEnvironmentVariables();
builder.Services.AddEndpointsApiExplorer();
builder.Services.ConfigureSwagger();
builder.Services.AddApplication();


string connectionString = builder.Configuration["POSTGRES_SQL_CONNECTION"]
                    ?? throw new ArgumentNullException("POSTGRES_SQL_CONNECTION environment variable is not set.");


builder.Services.AddDbContext<DbContext, InventoryDbContext>(options =>
    options.UseNpgsql(connectionString,
            b => b.MigrationsAssembly("InventoryService.Api"))
        .EnableSensitiveDataLogging()
        .LogTo(Console.WriteLine, LogLevel.Information)
);


 builder.Services.AddSingleton(sp =>
    {
        var factory = new ConnectionFactory
        {
            HostName = "localhost",
            UserName = "merchantadmin",
            Password = "merchantpass",
            VirtualHost = "/",
            Port = 5672
        };
        return factory.CreateConnection();
    });

builder.Services.AddSingleton<IMessageProducer, MessageProducer>();


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
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.Run();
