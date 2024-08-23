using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BretonBackend.Models;
using Microsoft.EntityFrameworkCore;

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
            // optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 25)));
            optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 25)));
        }

        public DbSet<Cliente> Clientes { get; set; }
    }
}