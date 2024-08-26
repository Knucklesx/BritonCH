using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BretonBackend.Data;
using BretonBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


namespace BretonBackend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly BretonContext _bretonContext;


        public LoginController(BretonContext bretonContext)
        {
            _bretonContext = bretonContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Senha))
            {
                return BadRequest("Invalid login request");
            }

            var user = await _bretonContext.Users
                .FirstOrDefaultAsync(u => u.Email == loginRequest.Email && u.Senha == loginRequest.Senha);


            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            // return Ok("Login successful");
            return Ok(user);
        }
    }
}

