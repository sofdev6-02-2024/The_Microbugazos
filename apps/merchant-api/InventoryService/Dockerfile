# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY src/InventoryService.Api/InventoryService.Api.csproj InventoryService.Api/
COPY src/InventoryService.Application/InventoryService.Application.csproj InventoryService.Application/
COPY src/InventoryService.Intraestructure/InventoryService.Intraestructure.csproj InventoryService.Intraestructure/
COPY src/InventoryService.Domain/InventoryService.Domain.csproj InventoryService.Domain/

WORKDIR /app/InventoryService.Api
RUN dotnet restore

COPY src/InventoryService.Api/ .
COPY src/InventoryService.Application/ ../InventoryService.Application/
COPY src/InventoryService.Intraestructure/ ../InventoryService.Intraestructure/
COPY src/InventoryService.Domain/ ../InventoryService.Domain/

RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 8080

ENTRYPOINT ["dotnet", "InventoryService.Api.dll"]
