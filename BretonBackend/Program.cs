using BretonBackend.Data;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

builder.Configuration.AddEnvironmentVariables();


// builder.Services.AddDbContext<BretonContext>(options =>
//     options.UseMySql(
//         builder.Configuration.GetConnectionString("BretonConnection"),
//         new MySqlServerVersion(new Version(8, 0, 25))
//     )
// );

builder.Configuration.AddEnvironmentVariables();

builder.Services.AddDbContext<BretonContext>(options =>
    options.UseMySql(
        Environment.GetEnvironmentVariable("CONNECTION_STRING"),
        new MySqlServerVersion(new Version(8, 0, 25))
    )
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();