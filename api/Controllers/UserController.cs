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

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public UserController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            try
            {

                var user = await _context.Users.FindAsync(id);

                if (user == null)
                {
                    return NotFound();
                }

                return user;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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
        public async Task<IActionResult> Login(UserLoginDTO loginDTO)
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
                    expiresAt = DateTime.UtcNow.AddMinutes(60),
                    id = user.UserId,
                    username = user.Username
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {

                var user = await _context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound();
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("You are authorized");
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
