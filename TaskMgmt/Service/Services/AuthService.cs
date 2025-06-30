using AutoMapper;
using Repo;

namespace Service
{
    class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public AuthService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<bool> RegisterUser(RegisterUserDTO registerUser)
        {
            // Hash the password (replace with your actual hashing logic)
            //string passwordHash = BCrypt.Net.BCrypt.HashPassword(registerUser.Password);

            var user = _mapper.Map<User>(registerUser);
            //user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerUser.Password);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
