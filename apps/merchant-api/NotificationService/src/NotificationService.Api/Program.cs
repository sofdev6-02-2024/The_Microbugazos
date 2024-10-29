using DotNetEnv;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

Env.Load("../../.env");

builder.Services.AddCors(
    options => options.AddPolicy("AllowLocalhost",
        builder => builder.WithOrigins("*")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
    )
);

builder.Services.AddEndpointsApiExplorer();

builder.Configuration.AddEnvironmentVariables();

builder.Services.AddAuthorization();

builder.Services.AddControllers();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "NotificationService API", Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowLocalhost");

app.UseAuthorization();

app.MapControllers();

app.Run();