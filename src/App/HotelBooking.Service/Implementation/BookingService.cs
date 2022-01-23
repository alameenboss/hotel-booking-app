using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Domain;
using HotelBooking.Service.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
            return await _repository
                            .Bookings
                            .GetAll();
        }

        public async Task<Booking> GetById(int Id)
        {
            return await _repository
                            .Bookings
                            .GetById(Id);
        }

        public async Task<IEnumerable<Booking>> GetBookingsByDate(DateTime startdate)
        {
            return await _repository
                            .Bookings
                            .FindByCondition(x => (x.StartDate.Date == startdate), true)
                            .ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetBookingsByStartDateAndEndDate(DateTime startdate, DateTime enddate)
        {
            return await _repository
                            .Bookings
                            .FindByCondition(x => (x.StartDate.Date >= startdate.AddDays(-1).Date &&
                                                   x.EndDate.Date <= enddate.AddDays(1).Date),
                                                   true
                                            )
                            .ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetBookingsByUserId(string userId)
        {
            return await _repository
                            .Bookings
                            .FindByCondition(x => x.UserId == userId, true)
                            .Include(r => r.Room)
                            .ToListAsync();
        }

        public async Task Create(Booking booking)
        {
            _repository.Bookings.Create(booking);
            await _repository.Save();
        }
    }
}