using HotelBooking.API.DTO.Room;
using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Data.Repository.EFCore;
using HotelBooking.Domain;
using HotelBooking.Service.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {

        private readonly IBookingService _bookingService;
        private readonly IRoomService _roomService;
        public BookingsController(IBookingService bookingService, 
            IRoomService roomService)
        {
            _bookingService = bookingService;
            _roomService = roomService;
        }


        // GET: api/Bookings/bydate/02-02-2021
        [HttpGet("bydate/{date}")]
        public async Task<ActionResult<IEnumerable<RoomBookingDTO>>> GetBooking(DateTime date)
        {
            return Ok(await GetBookings(date, date));
        }

        // GET: api/Bookings/bydate/02-02-2021
        [HttpGet("checkavailable/{roomType}/{startdate}/{enddate}")]
        public async Task<ActionResult<IEnumerable<RoomBookingDTO>>> GetAvailabe(string roomType,DateTime startdate, DateTime enddate)
        {
            var allRooms = await GetBookings(startdate, enddate);
            var availableRooms = allRooms.Where(x => x.Status == "Not Booked" && x.Type == roomType);
            return Ok(availableRooms);
        }


        private async Task<IEnumerable<RoomBookingDTO>> GetBookings(DateTime startdate, DateTime enddate)
        {
            var booking = await _bookingService.GetBookings(startdate,enddate);
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
                    RoomName = "",
                    Type = "",
                    UserId = item.UserId,
                    Status = "Booked"
                };
                roomsbookings.Add(roomsbooking);
            }
            return Ok(roomsbookings);
        }

        // POST: api/Bookings
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Member")]
        public async Task<ActionResult<Booking>> AddBooking(Booking booking)
        {
            await _bookingService.Create(booking);
            return Ok(booking);
        }
    }


    #region "removed code"

    //// GET: api/Bookings
    //[HttpGet]
    //public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
    //{
    //    return await _context.Bookings.ToListAsync();
    //}

    //// PUT: api/Bookings/5
    //// To protect from overposting attacks, enable the specific properties you want to bind to, for
    //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    //[HttpPut("{id}")]
    //public async Task<IActionResult> PutBooking(int id, Booking booking)
    //{
    //    if (id != booking.Id)
    //    {
    //        return BadRequest();
    //    }

    //    _context.Entry(booking).State = EntityState.Modified;

    //    try
    //    {
    //        await _context.SaveChangesAsync();
    //    }
    //    catch (DbUpdateConcurrencyException)
    //    {
    //        if (!BookingExists(id))
    //        {
    //            return NotFound();
    //        }
    //        else
    //        {
    //            throw;
    //        }
    //    }

    //    return NoContent();
    //}

    //// DELETE: api/Bookings/5
    //[HttpDelete("{id}")]
    //public async Task<ActionResult<Booking>> DeleteBooking(int id)
    //{
    //    var booking = await _context.Bookings.FindAsync(id);
    //    if (booking == null)
    //    {
    //        return NotFound();
    //    }

    //    _context.Bookings.Remove(booking);
    //    await _context.SaveChangesAsync();

    //    return booking;
    //}
    #endregion
}
