namespace Repo
{
    public interface IAuthRepo 
    {
        Task<bool> RegisterUser(User registerUser);
        Task<bool> IsUserAlreadyExists(string email);
    }
}
