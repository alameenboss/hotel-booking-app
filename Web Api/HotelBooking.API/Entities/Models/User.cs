using Microsoft.AspNetCore.Identity;

namespace HotelBooking.API.Entities.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
