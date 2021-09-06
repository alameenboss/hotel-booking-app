using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Domain;
using HotelBooking.Service.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HotelBooking.Service.Implementation
{
    public class BookingService : IBookingService
    {
        private readonly IRepositoryManager _repository;

        public BookingService(IRepositoryManager repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Booking>> GetAll()
        {
            var result = await _repository.Bookings.GetAll();
            return result;
        }

        public async Task<Booking> GetById(int Id)
        {
            var result = await _repository.Bookings.GetById(Id);
            return result;
        }

        public async Task<IEnumerable<Booking>> GetBookings(DateTime startdate, DateTime enddate)
        {
            return await _repository.Bookings
                .FindByCondition(x => (x.StartDate.Date >= startdate.AddDays(-1).Date 
                            && x.EndDate.Date <= enddate.AddDays(1).Date), true)
                .ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetMyBooking(string userId)
        {
            return await _repository.Bookings.FindByCondition(x => x.UserId == userId, true).ToListAsync();
        }

        public async Task Create(Booking booking)
        {
            _repository.Bookings.Create(booking);
            await _repository.Save();
        }
    }
}
