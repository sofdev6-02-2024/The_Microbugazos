using KeycloakPOC.EventManagementService;

var builder = WebApplication.CreateBuilder(args);

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowApiGateway",
        builder =>
        {
            builder.WithOrigins("https://localhost:5001")
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddSingleton<IEventRepository, EventRepository>();
builder.Services.AddEndpointsApiExplorer();


builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowApiGateway");



app.UseHttpsRedirection();
app.MapControllers();

app.Run();
