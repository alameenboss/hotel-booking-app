using HotelBooking.Data.Repository.EFCore;
using HotelBooking.IdentityServer.Models.User;
using HotelBooking.Web.Common.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.API.Controllers
{
    [Authorize(Roles = "Administrator")]
    public class UsersController : DefaultBaseController
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly UserDbContext _dbContext;

        public UsersController(UserManager<IdentityUser> userManager, UserDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<UserResponse>> GetAllUsers()
        {
            
            var allUsers = await _userManager.Users.ToListAsync();
            var allRoles = await _dbContext.Roles.ToListAsync();
            var allUserRoles = await _dbContext.UserRoles.ToListAsync();
            var result = new List<UserResponse>();
            allUsers.ForEach(user =>
            {
                var userRoleIds = allUserRoles.Where(u => u.UserId == user.Id).Select(r => r.RoleId);
                var userRoles = allRoles.Where(r => userRoleIds.Contains(r.Id));

                result.Add(new UserResponse()
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    EmailConfirmed = user.EmailConfirmed,
                    Roles = string.Join(",", userRoles.Select(x => x.Name).ToList())
                });

            });
           

            return result;
        }

        [HttpPost("makeAdmin")]
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

        [HttpPost("makeMember")]
        public async Task<ActionResult> MakeUserMember(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (await _userManager.IsInRoleAsync(user, "Administrator"))
            {
                await _userManager.RemoveFromRoleAsync(user, "Administrator");
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return Ok();
        }
    }
}