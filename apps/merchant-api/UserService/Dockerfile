FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY UserService/src/UserService.Api/UserService.Api.csproj UserService/src/UserService.Api/
COPY UserService/src/UserService.Application/UserService.Application.csproj UserService/src/UserService.Application/
COPY UserService/src/UserService.Infrastructure/UserService.Infrastructure.csproj UserService/src/UserService.Infrastructure/
COPY UserService/src/UserService.Domain/UserService.Domain.csproj UserService/src/UserService.Domain/
COPY NotificationService/src/NotificationService.Domain/NotificationService.Domain.csproj NotificationService/src/NotificationService.Domain/
COPY MerchantCommon/RabbitMqMessaging/RabbitMqMessaging.csproj MerchantCommon/RabbitMqMessaging/
COPY MerchantCommon/Commons/Commons.csproj MerchantCommon/Commons/

WORKDIR /app/UserService/src/UserService.Api
RUN dotnet restore

COPY UserService/src/UserService.Api/. .
COPY UserService/src/UserService.Application/. ../UserService.Application/
COPY UserService/src/UserService.Infrastructure/. ../UserService.Infrastructure/
COPY UserService/src/UserService.Domain/. ../UserService.Domain/
COPY NotificationService/src/NotificationService.Domain/. /app/NotificationService/src/NotificationService.Domain/
COPY MerchantCommon/RabbitMqMessaging/. /app/MerchantCommon/RabbitMqMessaging/
COPY MerchantCommon/Commons/. /app/MerchantCommon/Commons/

RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080
ENTRYPOINT ["dotnet", "UserService.Api.dll"]
