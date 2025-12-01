using System.ComponentModel.DataAnnotations;

namespace CrmBackendApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; } // <-- New

        [Required]
        public string LastName { get; set; }  // <-- New

        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }
    }
}