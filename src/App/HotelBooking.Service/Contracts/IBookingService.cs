using HotelBooking.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelBooking.Service.Contracts
{
    public interface IBookingService
    {
        Task Create(Booking booking);
        Task<IEnumerable<Booking>> GetAll();
        Task<IEnumerable<Booking>> GetBookingsByDate(DateTime startdate);
        Task<IEnumerable<Booking>> GetBookingsByStartDateAndEndDate(DateTime startdate, DateTime enddate);
        Task<IEnumerable<Booking>> GetBookingsByUserId(string userId);
        Task<Booking> GetById(int Id);
    }
}