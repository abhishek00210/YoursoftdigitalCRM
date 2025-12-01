using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography; 
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public AuthController(ApiDbContext db)
        {
            _db = db;
        }

        // POST: /api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserCredentials credentials)
        {
            if (await _db.Users.AnyAsync(u => u.Email == credentials.Email))
            {
                return BadRequest("User with this email already exists.");
            }

            var passwordHash = HashPassword(credentials.Password);

            var user = new User
            {
                FirstName = credentials.FirstName, // <-- Map First Name
                LastName = credentials.LastName,   // <-- Map Last Name
                Email = credentials.Email,
                PasswordHash = passwordHash
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new { Message = "Registration successful" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin credentials)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == credentials.Email);
            var passwordHash = HashPassword(credentials.Password);

            if (user == null || user.PasswordHash != passwordHash)
            {
                return Unauthorized("Invalid email or password.");
            }

            // Return the user's name so the frontend can display it
            return Ok(new { 
                Message = "Login successful", 
                User = new { user.FirstName, user.LastName, user.Email } 
            });
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
    }

    // Updated DTO for Registration
    public class UserCredentials
    {
        [Required]
        public string FirstName { get; set; } // <-- New
        [Required]
        public string LastName { get; set; }  // <-- New
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }

    // Separate DTO for Login (since login doesn't need names)
    public class UserLogin
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}