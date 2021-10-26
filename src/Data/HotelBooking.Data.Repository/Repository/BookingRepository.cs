using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Data.Repository.EFCore;
using HotelBooking.Domain;

namespace HotelBooking.Data.Repository.Repository
{
    public class BookingRepository : RepositoryBase<Booking>, IBookingRepository
    {
        protected ApplicationDbContext _repositoryContext;

        public BookingRepository(ApplicationDbContext repositoryContext)
            : base(repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
    }
}