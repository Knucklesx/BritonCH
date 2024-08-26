using BretonBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BretonBackend.Data
{
    public class BretonContext : DbContext
    {

        public BretonContext(DbContextOptions<BretonContext> options)
                   : base(options)
        {
            DotNetEnv.Env.Load();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
            optionsBuilder
                .UseSqlServer(connectionString)
                .UseLazyLoadingProxies();
        }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<User> Users { get; set; }

        public void Seed()
        {
            if (!Users.Any())
            {
                Users.Add(new User
                {
                    Nome = "Usuário1",
                    Email = "usuario1@gmail.com",
                    Senha = "1",
                    Role = "user"
                });
                SaveChanges();
            }
        }

    }
}