FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar los archivos de proyecto necesarios
COPY NotificationService/src/NotificationService.Api/NotificationService.Api.csproj NotificationService/src/NotificationService.Api/
COPY NotificationService/src/NotificationService.Application/NotificationService.Application.csproj NotificationService/src/NotificationService.Application/
COPY NotificationService/src/NotificationService.Infraestructure/NotificationService.Infraestructure.csproj NotificationService/src/NotificationService.Infrastructure/
COPY NotificationService/src/NotificationService.Domain/NotificationService.Domain.csproj NotificationService/src/NotificationService.Domain/
COPY MerchantCommon/RabbitMqMessaging/RabbitMqMessaging.csproj MerchantCommon/RabbitMqMessaging/

# Restaurar dependencias
WORKDIR /app/NotificationService/src/NotificationService.Api
RUN dotnet restore

# Copiar el código fuente
COPY NotificationService/src/NotificationService.Api/. .
COPY NotificationService/src/NotificationService.Application/. ../NotificationService.Application/
COPY NotificationService/src/NotificationService.Infraestructure/. ../NotificationService.Infraestructure/
COPY NotificationService/src/NotificationService.Domain/. ../NotificationService.Domain/
COPY MerchantCommon/RabbitMqMessaging/. /app/MerchantCommon/RabbitMqMessaging/

# Publicar el proyecto
RUN dotnet publish -c Release -o /app/out

# Copiar el directorio de plantillas de correo
COPY NotificationService/src/templates /app/out/templates

# Imagen final
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/out .

EXPOSE 8080
ENTRYPOINT ["dotnet", "NotificationService.Api.dll"]
