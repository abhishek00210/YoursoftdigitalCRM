// Models/Employee.cs
namespace CrmBackendApi.Models;

public class Employee
{
    public int Id { get; set; } // This will be the Primary Key
    public string Name { get; set; }
    public string Email { get; set; }
    public string? Phone { get; set; } // The '?' means it can be null
    public string Role { get; set; }
    public string JoinDate { get; set; }
}