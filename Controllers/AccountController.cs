using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;


    public AccountController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = _userManager.Users.ToList();
        return Ok(users);
    }

    [HttpGet]
    [Route("{userId}")]
    public async Task<ActionResult<List<IdentityUser>>> SearchUser([FromRoute] string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            Console.WriteLine("User not found");
            return NotFound();
        }
        return Ok(user);
    }

    [HttpGet]
    [Route("{userId}/rol")]
    public async Task<ActionResult<List<IdentityUser>>> UserRol([FromRoute] string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return NotFound();
        }

        var rol = await _userManager.GetRolesAsync(user);
        return Ok(rol);
    }


    [HttpPost]
    public async Task<IActionResult> Create([FromBody] createUser gebruiker)
    {
        var user = new IdentityUser { UserName = gebruiker.Email, Email = gebruiker.Email};
        var result = await _userManager.CreateAsync(user);

        if (result.Succeeded)
        {
            if (!await _roleManager.RoleExistsAsync(gebruiker.Rol))
            {
                var role = new IdentityRole(gebruiker.Rol);
                await _roleManager.CreateAsync(role);
            }

            await _userManager.AddToRoleAsync(user, gebruiker.Rol);
            return Ok();
        }
        else
        {
            return BadRequest(result.Errors);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        var result = await _userManager.DeleteAsync(user);
        if (result.Succeeded)
        {
            return Ok();
        }
        else
        {
            return BadRequest(result.Errors);
        }
    }

}
public class createUser{
    public string Rol {get; set;}
    public string Email { get; set; }
}