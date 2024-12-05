using Commons.ResponseHandler.Handler.Concretes;
using Commons.ResponseHandler.Handler.Interfaces;
using DotNetEnv;
using FluentValidation;
using ReviewService.Api.Configuration;
using ReviewService.Application.Profiles;
using ReviewService.Application.ValidationSettings;

Env.Load("../../../.env");
var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();

builder.Configuration.AddJsonFile("validationSettings.json", optional: false, reloadOnChange: true);
builder.Services.Configure<ValidationSettings>(builder.Configuration);

var apiGateway = builder.Configuration["ApiGatewayUrl"] ?? "http://localhost:5001";
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowedLocalhost",
        policyBuilder => policyBuilder
            .WithOrigins(apiGateway)
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var connectionString = builder.Configuration["MONGODB_URI"];
if (connectionString == null)
{
    Console.WriteLine("You must set your 'MONGODB_URI' environment variable. To learn how to set it, see https://www.mongodb.com/docs/drivers/csharp/current/quick-start/#set-your-connection-string");
    Environment.Exit(0);
}

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddRepositories();
builder.Services.ConfigDbSet(connectionString);
builder.Services.AddValidatorsFromAssembly(typeof(ReviewServiceProfile).Assembly);
builder.Services.AddAutoMapper(typeof(ReviewServiceProfile));
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssemblies(typeof(ReviewServiceProfile).Assembly));
builder.Services.AddScoped<IResponseHandlingHelper, ResponseHandlingHelper>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.UseCors("AllowApiGateway");
app.UseHttpsRedirection();
app.Run();