using System.ComponentModel.DataAnnotations;

namespace CrmBackendApi.Models
{
    public class ClientContact
    {
        public int Id { get; set; }

        [Required]
        public string Type { get; set; } // "Client" or "Vendor"

        [Required]
        public string ClientName { get; set; }

        [Required]
        public string ContactPerson { get; set; }

        public string? Designation { get; set; }

        public string? ContactNo { get; set; }

        public string? Email { get; set; } // <-- Added Email field
    }
}