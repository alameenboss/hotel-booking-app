using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.API.Entities.DTO
{
    public class RoomBookingDTO
    {
        public int BookingId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public string Type { get; set; }
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string Status { get; set; }
    }
}
