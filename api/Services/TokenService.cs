using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using api.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace api.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateJwtToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_config["JwtSettings:Secret"]);
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                }),
                Expires = DateTime.UtcNow.AddDays(Convert.ToDouble(_config["JwtSettings:ExpirationInDays"])),
                //Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["JwtSettings:ExpirationInMinutes"])),
                Issuer = _config["JwtSettings:Issuer"],
                Audience = _config["JwtSettings:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string RenewToken(string existingToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["JwtSettings:Secret"]);

            try
            {

                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _config["JwtSettings:Issuer"],
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                var principal = tokenHandler.ValidateToken(existingToken, tokenValidationParameters, out var securityToken);

                var jwtToken = (JwtSecurityToken)securityToken;
                var exp = jwtToken.ValidTo;

                if ((exp - DateTime.UtcNow).TotalHours <= 24)
                {
                    var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                    var userName = principal.FindFirst(ClaimTypes.Name)?.Value;

                    if (userId == null || userName == null)
                    {
                        throw new SecurityTokenArgumentException("Invalid token");
                    }

                    var user = new User { UserId = Convert.ToInt32(userId), Username = userName };
                    return GenerateJwtToken(user);
                }

                return existingToken;

            }
            catch (SecurityTokenException)
            {
                throw new SecurityTokenException("Invalid token");
            }
        }
    }
}