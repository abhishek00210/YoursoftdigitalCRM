namespace CrmBackendApi.Models;

public class BookingPage
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int OwnerUserId { get; set; }
    public string ThemeName { get; set; } = "default";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
