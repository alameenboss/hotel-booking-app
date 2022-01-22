namespace HotelBooking.API.DTO.Booking
{
    public class Bookings
    {
        public Bookings(int roomid)
        {
            RoomId = roomid;
        }
        public int RoomId { get; set; }
    }
}
