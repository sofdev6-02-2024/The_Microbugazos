using UserService.Api;
using Microsoft.AspNetCore.Diagnostics;
using UserService.Application;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using UserService.Infrastructure.Context;
using RabbitMQ.Client;
using MerchantCommon.RabbitMqMessaging.Services;

var builder = WebApplication.CreateBuilder(args);

Env.Load("../../../.env");

string hostUrl = builder.Configuration["ApiGatewayUrl"] ?? throw new ArgumentNullException("ApiGatewayUrl not found");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder.WithOrigins(hostUrl)
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Configuration.AddEnvironmentVariables();
builder.Services.AddApplication(builder.Configuration);


string connectionString = builder.Configuration["POSTGRES_SQL_CONNECTION"]
                     ?? throw new ArgumentNullException("POSTGRES_SQL_CONNECTION");
builder.Services.AddDbContext<DbContext, PostgresContext>(options =>
    options.UseNpgsql(connectionString,
            b => b.MigrationsAssembly("UserService.Api"))
        .LogTo(Console.WriteLine, LogLevel.Information)
);

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddSingleton<IExceptionHandler, GlobalExceptionHandler>();
builder.Services.ConfigureSwagger();


builder.Services.AddSingleton(sp =>
{
    var factory = new ConnectionFactory
    {
        HostName = "rabbitmq",
        UserName = "merchantadmin",
        Password = "merchantpass",
        VirtualHost = "/",
        Port = 5672
    };
    return factory.CreateConnection();
});

builder.Services.AddSingleton<IMessageProducer, MessageProducer>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseExceptionHandler("/error");
}

app.UseHttpsRedirection();
app.UseCors("AllowLocalhost");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
