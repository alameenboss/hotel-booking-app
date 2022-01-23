using System.Collections.Generic;

namespace HotelBooking.IdentityServer.Models.Auth
{
    public class RegistrationResponseDto
    {
        public bool IsSuccessfulRegistration { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}