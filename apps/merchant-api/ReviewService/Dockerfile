FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY ReviewService/src/ReviewService.Api/ReviewService.Api.csproj ReviewService/src/ReviewService.Api/ 
COPY ReviewService/src/ReviewService.Application/ReviewService.Application.csproj ReviewService/src/ReviewService.Application/ 
COPY ReviewService/src/ReviewService.Domain/ReviewService.Domain.csproj ReviewService/src/ReviewService.Domain/ 
COPY ReviewService/src/ReviewService.Infrastructure/ReviewService.Infrastructure.csproj ReviewService/src/ReviewService.Infrastructure/ 
COPY MerchantCommon/RabbitMqMessaging/RabbitMqMessaging.csproj MerchantCommon/RabbitMqMessaging/
COPY NotificationService/src/NotificationService.Domain/NotificationService.Domain.csproj NotificationService/src/NotificationService.Domain/
COPY MerchantCommon/Commons/Commons.csproj MerchantCommon/Commons/

WORKDIR /app/ReviewService/src/ReviewService.Api
RUN dotnet restore

COPY ReviewService/src/ReviewService.Api/. . 
COPY ReviewService/src/ReviewService.Application/. ../ReviewService.Application/ 
COPY ReviewService/src/ReviewService.Domain/. ../ReviewService.Domain/ 
COPY ReviewService/src/ReviewService.Infrastructure/. ../ReviewService.Infrastructure/ 
COPY NotificationService/src/NotificationService.Domain/. /app/NotificationService/src/NotificationService.Domain/
COPY MerchantCommon/RabbitMqMessaging/. /app/MerchantCommon/RabbitMqMessaging/
COPY MerchantCommon/Commons/. /app/MerchantCommon/Commons/

RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080
ENTRYPOINT ["dotnet", "ReviewService.Api.dll"]