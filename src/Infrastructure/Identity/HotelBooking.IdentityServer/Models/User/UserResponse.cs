using Microsoft.AspNetCore.Identity;

namespace HotelBooking.IdentityServer.Models.User
{
    public class UserResponse : IdentityUser
    {
        public string Roles { get; set; }
    }
}