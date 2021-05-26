using HotelBooking.API.Entities.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.API.Entities
{
    public class MyIdentityDataInitializer
    {
        public static void SeedData(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }
        public static void SeedUsers(UserManager<User> userManager)
        {
            if (userManager.FindByEmailAsync("superadmin@gmail.com").Result == null)
            {
                User user = new User();
                user.UserName = "superadmin@gmail.com";
                user.Email = "superadmin@gmail.com";
                user.EmailConfirmed = true;

                IdentityResult result = userManager.CreateAsync(user, "Test@123").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Administrator").Wait();
                }
            }
        }
        public static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("Member").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Member";
                role.NormalizedName = "MEMBER";
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }


            if (!roleManager.RoleExistsAsync("Administrator").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Administrator";
                role.NormalizedName = "ADMINISTRATOR";
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }
        }
    }
}
