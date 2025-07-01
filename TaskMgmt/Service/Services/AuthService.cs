using AutoMapper;
using Repo;

namespace Service
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepo _authRepo;
        private readonly IMapper _mapper;

        public AuthService(IAuthRepo authRepo, IMapper mapper)
        {
            _authRepo = authRepo;
            _mapper = mapper;
        }


        public async Task<bool> RegisterUser(RegisterUserDTO registerUser)
        {
            try
            {

                var user = _mapper.Map<User>(registerUser);
                if(await _authRepo.RegisterUser(user))
                {
                    return true;
                }
                return false;

            }
            catch (Exception)
            {
                return false;
            }

        }
    }
}
