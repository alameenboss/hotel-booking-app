using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Data.Repository.EFCore;
using System.Threading.Tasks;

namespace HotelBooking.Data.Repository.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly ApplicationDbContext _repositoryContext;
        private readonly IRoomRepository _roomRepository;
        private readonly IBookingRepository _bookingRepository;

        public RepositoryManager(
            ApplicationDbContext repositoryContext,
            IRoomRepository roomRepository,
            IBookingRepository bookingRepository)
        {
            _repositoryContext = repositoryContext;
            _roomRepository = roomRepository;
            _bookingRepository = bookingRepository;
        }

        public async Task Save() => await _repositoryContext.SaveChangesAsync();
        public IRoomRepository Room => _roomRepository;
        public IBookingRepository Bookings => _bookingRepository;
    }
}