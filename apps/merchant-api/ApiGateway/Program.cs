using ApiGateway.ServerConfigurations;
using DotNetEnv;
using Ocelot.Middleware;

Env.Load("../.env");

var builder = WebApplication.CreateBuilder(args);


string hostUrl = builder.Configuration["WebHostUrl"] ?? "http://localhost:3000";


builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAllOrigins",
            builder => builder.WithOrigins(hostUrl)
                              .AllowAnyMethod()
                              .AllowAnyHeader());
    });

builder.Services.AddLogging(logging =>
{
    logging.AddConsole();
    logging.AddDebug();
});
builder.Services.ConfigureOcelot(builder.Configuration);
builder.Services.ConfigureAuth(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.ConfigureSwagger();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerConfig();
}


app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");
app.UseAuthentication();
app.UseAuthorization();

await app.UseOcelot();

await app.RunAsync();