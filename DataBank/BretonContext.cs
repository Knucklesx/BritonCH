using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Breton.Banco;
public class BretonContext : DbContext
{
  public DbSet<Cliente> Clientes { get; set; }



  private string connectionString = "Server=localhost;Port=3307;Database=bretonDB;User=root;Password=123;";
  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 25)));
  }
}