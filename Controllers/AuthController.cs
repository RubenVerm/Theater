
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;


[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;

    public AuthController(UserManager<IdentityUser> userManager,SignInManager<IdentityUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] ApplicationUser gebruikerLogin)
    {
        var _user = await _userManager.FindByNameAsync(gebruikerLogin.UserName);
        if (_user != null)
            if (await _userManager.CheckPasswordAsync(_user, gebruikerLogin.Password))
            {
                var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("awef98awef978haweof8g7aw789efhh789awef8h9awh89efh89awe98f89uawef9j8aw89hefawef"));

                var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim> { new Claim(ClaimTypes.Name, _user.UserName) };
                var roles = await _userManager.GetRolesAsync(_user);
                foreach (var role in roles)
                    claims.Add(new Claim(ClaimTypes.Role, role));
                var tokenOptions = new JwtSecurityToken
                (
                    issuer: "https://localhost:7000",
                    audience: "https://localhost:7000",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: signingCredentials
                );
                return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions) });
            }

        return Unauthorized();
    }


    [HttpPost]
    [Route("registreer")]
    public async Task<ActionResult<IdentityUser>> Registreer([FromBody] ApplicationUser gebruikerRegistreer)
    {
        //check if email domain is in Services/emailDenyList.txt
        var emailDenyList = System.IO.File.ReadAllLines("Services/emailDenyList.txt");
        string gebruikerDomain = gebruikerRegistreer.Email.Split('@')[1];
        if (emailDenyList.Contains(gebruikerDomain))
        {
            return BadRequest("Email domain is not allowed");
        }

        var gebruiker = new ApplicationUser
        {
            UserName = gebruikerRegistreer.Email,
            Email = gebruikerRegistreer.Email,
        };
        var resultaat = await _userManager.CreateAsync(gebruiker, gebruikerRegistreer.Password);

        if (resultaat.Succeeded)
        {
            await _userManager.AddToRoleAsync(gebruiker, "Gebruiker");

            return StatusCode(201);
        }

        return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : StatusCode(201);
    }

    
}