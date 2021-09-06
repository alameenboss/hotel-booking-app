using HotelBooking.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HotelBooking.Service.Contracts
{
    public interface IBookingService
    {
        Task<IEnumerable<Booking>> GetAll();
        Task<IEnumerable<Booking>> GetBookings(DateTime startdate, DateTime enddate);
        Task<IEnumerable<Booking>> GetMyBooking(string userId);
        Task Create(Booking booking);
        Task<Booking> GetById(int id);
    }
}
