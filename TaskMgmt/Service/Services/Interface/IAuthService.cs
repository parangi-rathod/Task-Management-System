namespace Service
{
    public interface IAuthService 
    {
        Task<bool> RegisterUser(RegisterUserDTO registerUser);
    }
}
