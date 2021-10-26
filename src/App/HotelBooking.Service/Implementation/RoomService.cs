using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Domain;
using HotelBooking.Service.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelBooking.Service.Implementation
{
    public class RoomService : IRoomService
    {
        private readonly IRepositoryManager _repository;

        public RoomService(IRepositoryManager repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Room>> GetAll()
        {
            var result = await _repository.Room.GetAll();
            return result;
        }

        public async Task<Room> GetById(int Id)
        {
            var result = await _repository.Room.GetById(Id);
            return result;
        }

        public async Task Create(Room room)
        {
            _repository.Room.Create(room);
            await _repository.Save();
        }

        public async Task Update(Room room)
        {
            _repository.Room.Update(room);
            await _repository.Save();
        }

        public async Task<bool> Delete(int Id)
        {
            var result = await GetById(Id);
            if (result != null)
            {
                _repository.Room.Delete(result);
                await _repository.Save();
                return true;
            }

            return false;
        }
    }
}