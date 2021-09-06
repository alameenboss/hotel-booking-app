using System;
using System.Collections.Generic;
using System.Text;

namespace HotelBooking.API.DTO.Auth
{
    public class RegistrationResponseDto
    {
        public bool IsSuccessfulRegistration { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}
