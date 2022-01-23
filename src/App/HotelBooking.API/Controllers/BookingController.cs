using HotelBooking.API.Models.Room;
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

        [HttpGet("{startdate}")]
        public async Task<IEnumerable<RoomBookingResponse>> GetBooking(DateTime startdate)
        {
            var booking = await _bookingService.GetBookingsByDate(startdate);
            var rooms = await _roomService.GetAll();
            var roomsbookings = new List<RoomBookingResponse>();
            foreach (var room in rooms)
            {
                var roomsbooking = new RoomBookingResponse
                {
                    RoomName = room.Name,
                    Type = room.Type,
                    Status = booking.Any(x => x.RoomId == room.Id) ? "Booked" : "Not Booked"
                };
                roomsbookings.Add(roomsbooking);
            }
            return roomsbookings;
        }

        [HttpGet("{roomType}/{startdate}/{enddate}")]
        public async Task<IEnumerable<RoomBookingResponse>> GetAvailabe(string roomType, DateTime startdate, DateTime enddate)
        {
            var bookings = await _bookingService.GetBookingsByStartDateAndEndDate(startdate, enddate);
            var rooms = await _roomService.GetAll();
            var roomsbookings = new List<RoomBookingResponse>();
            foreach (var room in rooms)
            {
                var roomsbooking = new RoomBookingResponse
                {
                    BookingId = bookings.FirstOrDefault(x => x.RoomId == room.Id)?.Id ?? 0,
                    StartDate = startdate,
                    EndDate = enddate,
                    RoomId = room.Id,
                    RoomName = room.Name,
                    Type = room.Type,
                    UserId = bookings.FirstOrDefault(x => x.RoomId == room.Id)?.UserId ?? "",
                    Status = bookings.Any(x => x.RoomId == room.Id) ? "Booked" : "Not Booked"
                };
                roomsbookings.Add(roomsbooking);
            }
            if (roomType.ToLower() == "all")
            {
                return roomsbookings.Where(x => x.Status == "Not Booked");
            }
            
            return roomsbookings.Where(x => x.Status == "Not Booked" && x.Type == roomType);
        }

        [HttpGet("user/{userId}")]
        public async Task<IEnumerable<RoomBookingResponse>> GetBookingsByUserId(string userId)
        {
            var booking = await _bookingService.GetBookingsByUserId(userId);
            var roomsbookings = new List<RoomBookingResponse>();
            foreach (var item in booking)
            {
                var roomsbooking = new RoomBookingResponse
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
            return roomsbookings;
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