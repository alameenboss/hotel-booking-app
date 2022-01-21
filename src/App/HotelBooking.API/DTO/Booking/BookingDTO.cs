using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.API.DTO.Booking
{
    public class BookingDTO
    {
        public int RoomId { get; set; }
    }

    public class Bookings
    {
        public Bookings(int roomid)
        {
            RoomId = roomid;
        }
        public int RoomId { get; set; }
    }
}
