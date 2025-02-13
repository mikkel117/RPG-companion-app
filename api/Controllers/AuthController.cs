using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTO;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDTO registerDTO)
        {
            try
            {

                if (_context.Users.Any(u => u.Username == registerDTO.Username))
                    return BadRequest("Username already exists");

                PasswordHasher.CreatePasswordHash(registerDTO.Password, out byte[] passwordHash, out byte[] passwordSalt);

                var newUser = new User
                {
                    Username = registerDTO.Username,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt
                };

                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                return Ok("Registration successful");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("login")]
        public IActionResult Login(UserLoginDTO loginDTO)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Username == loginDTO.Username);
                if (user == null)
                    return BadRequest("user not found.");

                bool isValid = PasswordHasher.VerifyPasswordHash(loginDTO.Password, user.PasswordHash, user.PasswordSalt);
                if (!isValid)
                    return BadRequest("userName or Invalid password");

                var token = _tokenService.GenerateJwtToken(user);

                return Ok(new
                {
                    token,
                    id = user.UserId,
                    username = user.Username
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("renew-token")]
        public IActionResult RenewToken([FromBody] string token)
        {
            try
            {
                var newToken = _tokenService.RenewToken(token);
                return Ok(new { token = newToken });
            }
            catch (SecurityTokenException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}