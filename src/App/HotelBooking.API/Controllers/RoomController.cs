using HotelBooking.Domain;
using HotelBooking.Service.Contracts;
using HotelBooking.Web.Common.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelBooking.API.Controllers
{
    [Authorize(Roles = "Administrator")]
    public class RoomController : DefaultBaseController
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]
        public async Task<IEnumerable<Room>> GetRooms()
        {
            return await _roomService.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            var room = await _roomService.GetById(id);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoom(int id, Room room)
        {
            if (id != room.Id)
            {
                return BadRequest();
            }

            await _roomService.Update(room);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            await _roomService.Create(room);
            return CreatedAtAction("GetRoom", new { id = room.Id }, room);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteRoom(int id)
        {
            var result = await _roomService.Delete(id);
            if (!result)
            {
                return NotFound();
            }

            return result;
        }
    }
}