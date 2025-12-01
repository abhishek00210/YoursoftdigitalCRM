using System.ComponentModel.DataAnnotations;

namespace CrmBackendApi.Models
{
    public class Booking
    {
        public int Id { get; set; }

        [Required]
        public string ClientName { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Time { get; set; }

        public string? Notes { get; set; }
        
        public string Type { get; set; } = "Meeting";
    }
}