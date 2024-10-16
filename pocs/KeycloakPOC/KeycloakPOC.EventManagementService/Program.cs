using KeycloakPOC.EventManagementService;

var builder = WebApplication.CreateBuilder(args);

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowApiGateway",
        builder =>
        {
            builder.WithOrigins("http://localhost:5001")
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});



builder.Services.AddSingleton<IEventRepository, EventRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowApiGateway");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
