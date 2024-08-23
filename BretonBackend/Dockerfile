# Use a imagem oficial do .NET SDK para compilar a aplicação
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copie os arquivos de projeto e restaure as dependências
COPY *.csproj ./
RUN dotnet restore

# Copie o restante dos arquivos e compile a aplicação
COPY . ./
RUN dotnet publish -c Release -o out

# Use a imagem oficial do .NET Runtime para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Exponha a porta que a aplicação irá rodar
EXPOSE 80

# Defina o comando de entrada para rodar a aplicação
ENTRYPOINT ["dotnet", "SuaAplicacao.dll"]