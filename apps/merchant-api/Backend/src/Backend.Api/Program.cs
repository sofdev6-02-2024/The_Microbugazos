using Backend.Api;
using Backend.Api.Controllers.Notifications.OrderStatus;
using Backend.Application;
using Backend.Application.ValidatorSettings;
using Backend.Commons.Extensions;
using Backend.Commons.ResponseHandler.Handler.Concretes;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Infrastructure.Context;
using DotNetEnv;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

Env.Load("../.env");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Configuration.AddEnvironmentVariables();
builder.Services.AddApplication(builder.Configuration);
builder.Services.AddMassTransitWithRabbitMq("users-notifications", typeof(ShippedEmailController));


builder.Services.AddScoped<IResponseHandlingHelper, ResponseHandlingHelper>();

builder.Configuration.AddJsonFile("validationSettings.json", optional: false, reloadOnChange: true);
builder.Services.Configure<ValidationSettings>(builder.Configuration);

string connectionString = builder.Configuration["POSTGRES_SQL_CONNECTION"]
                     ?? throw new ArgumentNullException("POSTGRES_SQL_CONNECTION");
builder.Services.AddDbContext<DbContext, PostgresContext>(options =>
    options.UseNpgsql(connectionString,
            b => b.MigrationsAssembly("Backend.Api"))
        .LogTo(Console.WriteLine, LogLevel.Information)
);

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddSingleton<IExceptionHandler, GlobalExceptionHandler>();
builder.Services.ConfigureSwagger();
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
