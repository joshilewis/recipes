using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AspNetCore.Identity.DocumentDb;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace recipes.Controllers
{
  //Based on https://medium.com/@lugrugzo/asp-net-core-2-0-webapi-jwt-authentication-with-identity-mysql-3698eeba6ff8
  [Route("api/[controller]/[action]")]
  public class AccountController : Controller
  {
    private readonly SignInManager<DocumentDbIdentityUser> signInManager;
    private readonly UserManager<DocumentDbIdentityUser> userManager;
    private readonly IConfiguration configuration;

    public AccountController(
        UserManager<DocumentDbIdentityUser> userManager,
        SignInManager<DocumentDbIdentityUser> signInManager,
        IConfiguration configuration
        )
    {
      this.userManager = userManager;
      this.signInManager = signInManager;
      this.configuration = configuration;
    }

    [HttpPost]
    public async Task<object> SignIn([FromBody] LoginDto model)
    {
      var result = await signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

      if (!result.Succeeded) throw new ApplicationException("INVALID_LOGIN_ATTEMPT");

      var appUser = await userManager.FindByEmailAsync(model.Email);
      var token = GenerateJwtToken(model.Email, appUser);
      return new {token};
    }

    [HttpPost]
    public async Task<object> Register([FromBody] RegisterDto model)
    {
      var user = new DocumentDbIdentityUser
      {
        UserName = model.Email,
        Email = model.Email
      };
      var result = await userManager.CreateAsync(user, model.Password);

      if (!result.Succeeded) throw new ApplicationException("UNKNOWN_ERROR");

      await signInManager.SignInAsync(user, false);
      return GenerateJwtToken(model.Email, user);
    }

    private object GenerateJwtToken(string email, DocumentDbIdentityUser user)
    {
      var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtKey"]));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
      var expires = DateTime.Now.AddDays(Convert.ToDouble(configuration["JwtExpireDays"]));

      var token = new JwtSecurityToken(
          configuration["JwtIssuer"],
          configuration["JwtIssuer"],
          claims,
          expires: expires,
          signingCredentials: creds
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public class LoginDto
    {
      [Required]
      public string Email { get; set; }

      [Required]
      public string Password { get; set; }

    }

    public class RegisterDto
    {
      [Required]
      public string Email { get; set; }

      [Required]
      [StringLength(100, ErrorMessage = "PASSWORD_MIN_LENGTH", MinimumLength = 6)]
      public string Password { get; set; }
    }
  }
}
