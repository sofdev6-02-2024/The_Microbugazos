FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY InventoryService/src/InventoryService.Api/InventoryService.Api.csproj InventoryService/src/InventoryService.Api/
COPY InventoryService/src/InventoryService.Application/InventoryService.Application.csproj InventoryService/src/InventoryService.Application/
COPY InventoryService/src/InventoryService.Intraestructure/InventoryService.Intraestructure.csproj InventoryService/src/InventoryService.Intraestructure/
COPY InventoryService/src/InventoryService.Domain/InventoryService.Domain.csproj InventoryService/src/InventoryService.Domain/
COPY MerchantCommon/RabbitMqMessaging/RabbitMqMessaging.csproj MerchantCommon/RabbitMqMessaging/
COPY MerchantCommon/Commons/Commons.csproj MerchantCommon/Commons/

WORKDIR /app/InventoryService/src/InventoryService.Api
RUN dotnet restore

COPY InventoryService/src/InventoryService.Api/. .
COPY InventoryService/src/InventoryService.Application/. ../InventoryService.Application/
COPY InventoryService/src/InventoryService.Intraestructure/. ../InventoryService.Intraestructure/
COPY InventoryService/src/InventoryService.Domain/. ../InventoryService.Domain/
COPY MerchantCommon/RabbitMqMessaging/. /app/MerchantCommon/RabbitMqMessaging/
COPY MerchantCommon/Commons/. /app/MerchantCommon/Commons/

RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080
ENTRYPOINT ["dotnet", "InventoryService.Api.dll"]