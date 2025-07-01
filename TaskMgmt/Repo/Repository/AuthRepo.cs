using Microsoft.EntityFrameworkCore;

namespace Repo
{
    public class AuthRepo : IAuthRepo
    {
        private readonly AppDbContext _context;

        public AuthRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> IsUserAlreadyExists(string email)
        {
            return await _context.Users
                .AnyAsync(u => u.Email == email);
        }


        public async Task<bool> RegisterUser(User registerUser)
        {
            if (await IsUserAlreadyExists(registerUser.Email))
                return false;

            await _context.Users.AddAsync(registerUser);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
