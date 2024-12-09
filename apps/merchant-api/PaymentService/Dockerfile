FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY PaymentService/src/PaymentService.Api/PaymentService.Api.csproj PaymentService/src/PaymentService.Api/
COPY PaymentService/src/PaymentService.Application/PaymentService.Application.csproj PaymentService/src/PaymentService.Application/
COPY PaymentService/src/PaymentService.Infrastructure/PaymentService.Infrastructure.csproj PaymentService/src/PaymentService.Infrastructure/
COPY PaymentService/src/PaymentService.Domain/PaymentService.Domain.csproj PaymentService/src/PaymentService.Domain/
COPY PaymentService/src/PaymentService.Commons/PaymentService.Commons.csproj PaymentService/src/PaymentService.Commons/
COPY MerchantCommon/RabbitMqMessaging/RabbitMqMessaging.csproj MerchantCommon/RabbitMqMessaging/
COPY NotificationService/src/NotificationService.Domain/NotificationService.Domain.csproj NotificationService/src/NotificationService.Domain/
COPY MerchantCommon/Commons/Commons.csproj MerchantCommon/Commons/

WORKDIR /app/PaymentService/src/PaymentService.Api
RUN dotnet restore

COPY PaymentService/src/PaymentService.Api/. .
COPY PaymentService/src/PaymentService.Application/. ../PaymentService.Application/
COPY PaymentService/src/PaymentService.Infrastructure/. ../PaymentService.Infrastructure/
COPY PaymentService/src/PaymentService.Domain/. ../PaymentService.Domain/
COPY PaymentService/src/PaymentService.Commons/. ../PaymentService.Commons/
COPY MerchantCommon/RabbitMqMessaging/. /app/MerchantCommon/RabbitMqMessaging/
COPY NotificationService/src/NotificationService.Domain/. /app/NotificationService/src/NotificationService.Domain/
COPY MerchantCommon/Commons/. /app/MerchantCommon/Commons/

RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
COPY PaymentService/src/PaymentService.Api/Migrations Migrations
RUN apt-get update && apt-get install -y curl
EXPOSE 8080
ENTRYPOINT ["dotnet", "PaymentService.Api.dll"]