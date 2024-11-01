using UserService.Api;
using Microsoft.AspNetCore.Diagnostics;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using UserService.Application;
using UserService.Infrastructure.Context;

var builder = WebApplication.CreateBuilder(args);

Env.Load("../../../.env");

string hostUrl = builder.Configuration["HostUrl"] ?? throw new ArgumentNullException("HostUrl");

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
builder.Services.AddApplication();


string connectionString = Env.GetString("POSTGRES_SQL_CONNECTION");
builder.Services.AddDbContext<DbContext, PostgresContext>(options =>
    options.UseNpgsql(connectionString,
            b => b.MigrationsAssembly("UserService.Api"))
        .LogTo(Console.WriteLine, LogLevel.Information)
);

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddSingleton<IExceptionHandler, GlobalExceptionHandler>();
builder.Services.AddSwaggerAuthConfig();
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
