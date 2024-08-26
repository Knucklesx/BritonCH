using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BretonBackend.Data;
using BretonBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BretonBackend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly BretonContext _bretonContext;
        private readonly IConfiguration _configuration;

        public UserController(BretonContext bretonContext, IConfiguration configuration)
        {
            _bretonContext = bretonContext;
            _configuration = configuration;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
            var users = _bretonContext.Users.ToList();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            var user = _bretonContext.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public ActionResult Post([FromBody] User user)
        {
            // var newUser = new User
            // {
            //     Email = user.Email,
            //     Nome = user.Nome,
            //     Senha = BCrypt.Net.BCrypt.HashPassword(user.Senha),
            //     Role = "user",
            // };
            // _bretonContext.Users.Add(newUser);
            _bretonContext.Users.Add(user);
            _bretonContext.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _bretonContext.Entry(user).State = EntityState.Modified;
            _bretonContext.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var user = _bretonContext.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            _bretonContext.Users.Remove(user);
            _bretonContext.SaveChanges();
            return NoContent();
        }
    }
}