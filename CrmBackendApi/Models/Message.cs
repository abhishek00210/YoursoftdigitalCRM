using System.ComponentModel.DataAnnotations;

namespace CrmBackendApi.Models
{
    public class Message
    {
        public int Id { get; set; }

        [Required]
        public string Sender { get; set; }

        [Required]
        public string Subject { get; set; }

        public string? Preview { get; set; }
        
        public bool IsRead { get; set; } = false;

        public DateTime Time { get; set; } = DateTime.Now;
    }
}