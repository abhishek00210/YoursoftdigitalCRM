// Models/User.cs
using System.ComponentModel.DataAnnotations; // Required for [Required]

namespace CrmBackendApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; } // We'll store a hash, not the password
    }
}