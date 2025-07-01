
namespace Service
{
    public interface IJWTTokenService
    {
        string GenerateJwtToken(string userId, string userRole, string passwordReset);
    }
}
