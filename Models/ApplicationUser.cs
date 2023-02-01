using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

public class ApplicationUser : IdentityUser
{
    public string Password { get; init; }

    public ICollection<Ticket>? Tickets { get; set; }
    public ICollection<Order>? Orders { get; set; }
}

public class ApplicationUserLogin
{
    [Required(ErrorMessage = "Username is required")]
    public string? UserName { get; init; }

    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; init; }
}