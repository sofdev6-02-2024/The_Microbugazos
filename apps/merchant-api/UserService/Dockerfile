# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY src/UserService.Api/UserService.Api.csproj UserService.Api/
COPY src/UserService.Application/UserService.Application.csproj UserService.Application/
COPY src/UserService.Infrastructure/UserService.Infrastructure.csproj UserService.Infrastructure/
COPY src/UserService.Domain/UserService.Domain.csproj UserService.Domain/

WORKDIR /app/UserService.Api
RUN dotnet restore

COPY src/UserService.Api/ .
COPY src/UserService.Application/ ../UserService.Application/
COPY src/UserService.Infrastructure/ ../UserService.Infrastructure/
COPY src/UserService.Domain/ ../UserService.Domain/

RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 8080

ENTRYPOINT ["dotnet", "UserService.Api.dll"]