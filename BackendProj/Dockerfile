# 1) Build aşaması
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Proje dosyasını kopyala ve restore et
COPY ["BackendProj.csproj", "./"]
RUN dotnet restore "./BackendProj.csproj"

# Kaynak kodu kopyala ve publish et
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# 2) Runtime aşaması
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "BackendProj.dll"]
