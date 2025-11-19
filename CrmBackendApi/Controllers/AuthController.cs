using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography; 
using System.Text;
using System.ComponentModel.DataAnnotations; // <-- ADD THIS LINE

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // This makes the URL /api/auth
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
            // 1. Check if user already exists
            if (await _db.Users.AnyAsync(u => u.Email == credentials.Email))
            {
                return BadRequest("User with this email already exists.");
            }

            // 2. "Hash" the password (this is a simple, non-secure hash for demo)
            // A real app should use a library like BCrypt.Net
            var passwordHash = HashPassword(credentials.Password);

            // 3. Create the new user
            var user = new User
            {
                Email = credentials.Email,
                PasswordHash = passwordHash
            };

            // 4. Save to database
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new { Message = "Registration successful" });
        }

        // POST: /api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserCredentials credentials)
        {
            // 1. Find the user by email
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == credentials.Email);

            // 2. Check if user exists and password is correct
            var passwordHash = HashPassword(credentials.Password);
            if (user == null || user.PasswordHash != passwordHash)
            {
                return Unauthorized("Invalid email or password.");
            }

            // 3. Login successful
            // (In a real app, you would return a JWT Token here)
            return Ok(new { Message = "Login successful" });
        }

        // --- Helper Methods ---

        // This is a simple (non-secure) hash for demonstration.
        // DO NOT use this in production. Use BCrypt.Net.
        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
    }

    // This is a "DTO" (Data Transfer Object)
    // It's a simple class to model the JSON we expect from React
    public class UserCredentials
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}