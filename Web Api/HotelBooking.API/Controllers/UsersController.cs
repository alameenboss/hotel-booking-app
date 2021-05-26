using HotelBooking.API.Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace HotelBooking.API.Controllers
{
    [Authorize(Roles = "Administrator")]
	[Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
		private readonly UserManager<User> _userManager;

		public UsersController(UserManager<User> userManager)
		{
			_userManager = userManager;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
		{
			var users = _userManager.Users.ToList();
			return Ok(users);
		}

		[HttpPost("makeUserAdmin")]
		public async Task<ActionResult> makeUserAdmin(string userId)
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
