using InventoryService.Api;

var builder = WebApplication.CreateBuilder(args);


string ApiGatewayUrl = builder.Configuration["ApiGatewayUrl"] ?? "http://localhost:5001";

builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowApiGateway",
                builder => builder
                    .WithOrigins(ApiGatewayUrl)
                    .AllowAnyMethod()
                    .AllowAnyHeader());
        });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.ConfigureSwagger();

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
