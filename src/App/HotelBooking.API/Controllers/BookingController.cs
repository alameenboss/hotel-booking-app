using HotelBooking.API.DTO.Room;
using HotelBooking.Domain;
using HotelBooking.Service.Contracts;
using HotelBooking.Web.Common.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.API.Controllers
{
    [Authorize]
    public class BookingController : DefaultBaseController
    {
        private readonly IBookingService _bookingService;
        private readonly IRoomService _roomService;
        public BookingController(IBookingService bookingService,
            IRoomService roomService)
        {
            _bookingService = bookingService;
            _roomService = roomService;
        }

        [HttpGet("bydate/{date}")]
        public async Task<ActionResult<IEnumerable<RoomBookingDTO>>> GetBooking(DateTime date)
        {
            return Ok(await GetBookings(date, date));
        }

        [HttpGet("checkavailable/{roomType}/{startdate}/{enddate}")]
        public async Task<ActionResult<IEnumerable<RoomBookingDTO>>> GetAvailabe(string roomType, DateTime startdate, DateTime enddate)
        {
            var allRooms = await GetBookings(startdate, enddate);
            var availableRooms = allRooms.Where(x => x.Status == "Not Booked" && x.Type == roomType);
            return Ok(availableRooms);
        }

        private async Task<IEnumerable<RoomBookingDTO>> GetBookings(DateTime startdate, DateTime enddate)
        {
            var booking = await _bookingService.GetBookings(startdate, enddate);
            var rooms = await _roomService.GetAll();
            var roomsbookings = new List<RoomBookingDTO>();
            foreach (var room in rooms)
            {
                var roomsbooking = new RoomBookingDTO
                {
                    BookingId = booking.FirstOrDefault(x => x.RoomId == room.Id)?.Id ?? 0,
                    StartDate = startdate,
                    EndDate = enddate,
                    RoomId = room.Id,
                    RoomName = room.Name,
                    Type = room.Type,
                    UserId = booking.FirstOrDefault(x => x.RoomId == room.Id)?.UserId ?? "",
                    Status = booking.Any(x => x.RoomId == room.Id) ? "Booked" : "Not Booked"
                };
                roomsbookings.Add(roomsbooking);
            }
            return roomsbookings;
        }

        [HttpGet("mybooking/{userId}")]
        public async Task<ActionResult<IEnumerable<RoomBookingDTO>>> GetMyBooking(string userId)
        {
            var booking = await _bookingService.GetMyBooking(userId);
            var roomsbookings = new List<RoomBookingDTO>();
            foreach (var item in booking)
            {
                var roomsbooking = new RoomBookingDTO
                {
                    BookingId = item.Id,
                    StartDate = item.StartDate,
                    EndDate = item.EndDate,
                    RoomId = item.Id,
                    RoomName = item?.Room?.Name,
                    Type = item?.Room?.Type,
                    UserId = item.UserId,
                    Status = "Booked"
                };
                roomsbookings.Add(roomsbooking);
            }
            return Ok(roomsbookings);
        }

        [HttpPost]
        [Authorize(Roles = "Member")]
        public async Task<ActionResult<Booking>> Create(Booking booking)
        {
            await _bookingService.Create(booking);
            return Ok(booking);
        }
    }
}