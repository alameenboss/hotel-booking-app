using System;

namespace HotelBooking.API.Models.Room
{
    public class RoomBookingResponse
    {
        public int BookingId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public string Type { get; set; }
        public string UserId { get; set; }

        public string Status { get; set; }
    }
}