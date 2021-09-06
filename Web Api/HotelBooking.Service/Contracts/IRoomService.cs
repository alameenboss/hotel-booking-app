using HotelBooking.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelBooking.Service.Contracts
{
    public interface IRoomService
    {
        Task<IEnumerable<Room>> GetAll();
        Task Create(Room booking);
        Task<Room> GetById(int id);
        Task Update(Room room);
        Task<bool> Delete(int id);
    }
}
