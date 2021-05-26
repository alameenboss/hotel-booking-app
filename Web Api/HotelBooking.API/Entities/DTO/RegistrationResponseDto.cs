using System;
using System.Collections.Generic;
using System.Text;

namespace HotelBooking.API.Entities.DTO
{
    public class RegistrationResponseDto
    {
        public bool IsSuccessfulRegistration { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}
