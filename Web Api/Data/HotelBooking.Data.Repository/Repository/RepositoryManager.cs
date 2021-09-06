using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Data.Repository.EFCore;
using System.Threading.Tasks;

namespace HotelBooking.Data.Repository.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _repositoryContext;
        private readonly ICompanyRepository _companyRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IRoomRepository _roomRepository;
        private readonly IBookingRepository _bookingRepository;

        public RepositoryManager(RepositoryContext repositoryContext,
            ICompanyRepository companyRepository,
            IEmployeeRepository employeeRepository,
            IRoomRepository roomRepository,
            IBookingRepository bookingRepository)
        {
            _repositoryContext = repositoryContext;
            _companyRepository = companyRepository;
            _employeeRepository = employeeRepository;
            _roomRepository = roomRepository;
            _bookingRepository = bookingRepository;
        }

        public async Task Save() => await _repositoryContext.SaveChangesAsync();

        public ICompanyRepository Company => _companyRepository;
        public IEmployeeRepository Employee => _employeeRepository;
        public IRoomRepository Room => _roomRepository;
        public IBookingRepository Bookings => _bookingRepository;

    }
}