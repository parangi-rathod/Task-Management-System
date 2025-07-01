using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Service
{
    public class JWTTokenService : IJWTTokenService
    {
        #region props
        private readonly IConfiguration _config;
        #endregion

        #region ctor
        public JWTTokenService(IConfiguration configuration)
        {
            _config = configuration;
        }
        #endregion

        #region generate JWT token
        public string GenerateJwtToken(string userRole, string userId, string passwordReset)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("Id", userId),
                new Claim(ClaimTypes.Role, userRole),
                new Claim("PasswordReset", passwordReset)

            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("JWT:Key").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(_config["JWT:Issuer"], _config["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: cred
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
        #endregion
    }
}
