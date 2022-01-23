using System.ComponentModel.DataAnnotations;

namespace HotelBooking.IdentityServer.Models.Auth
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string ClientURI { get; set; }
    }
}