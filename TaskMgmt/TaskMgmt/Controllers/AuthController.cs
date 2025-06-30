using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service;

namespace TaskMgmt.Controllers
{
    public class AuthController : BaseController
    {
        #region props

        private readonly IAuthService _authService;

        #endregion

        #region ctor
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        #endregion
        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDTO loginDTO)
        {
            var response = await _authService.RegisterUser(loginDTO);
            return Ok(response);
        }
       
    }
}
