using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelBooking.API.Controllers
{
    [Authorize(Roles = "Administrator")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UsersController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IdentityUser>>> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost("makeUserAdmin")]
        public async Task<ActionResult> MakeUserAdmin(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (await _userManager.IsInRoleAsync(user, "Member"))
            {
                await _userManager.RemoveFromRoleAsync(user, "Member");
            }

            await _userManager.AddToRoleAsync(user, "Administrator");

            return Ok();
        }
    }
}