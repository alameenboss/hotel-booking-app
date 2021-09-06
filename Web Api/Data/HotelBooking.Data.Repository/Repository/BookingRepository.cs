using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Data.Repository.EFCore;
using HotelBooking.Domain;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.Data.Repository.Repository
{
    public class BookingRepository : RepositoryBase<Booking>, IBookingRepository
    {
        protected RepositoryContext _repositoryContext;

       
        public BookingRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

    }
}
