using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBooking.API.Entities.Models
{
    public class Booking
    {
        [Column("BookingId")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Start Date is a required field.")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "End Date is a required field.")]
        public DateTime EndDate { get; set; }

        [ForeignKey(nameof(Room))]
        [Required(ErrorMessage = "Room is a required field.")]
        public int RoomId { get; set; }
        public Room Room { get; set; }

        [ForeignKey(nameof(User))]
        [Required(ErrorMessage = "User is a required field.")]
        public string UserId { get; set; }
        public User User { get; set; }

    }
}
