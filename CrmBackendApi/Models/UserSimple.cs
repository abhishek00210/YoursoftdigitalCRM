namespace CrmBackendApi.Models;

public class UserSimple
{
    public int Id { get; set; }
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Role { get; set; } = "Staff";
    public string AvatarUrl { get; set; } = "";
}
