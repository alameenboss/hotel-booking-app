using System.Threading.Tasks;

namespace HotelBooking.Data.Repository.Contracts
{
    public interface IRepositoryManager
    {
        ICompanyRepository Company { get; }
        IEmployeeRepository Employee { get; }
        IRoomRepository Room { get; }
        IBookingRepository Bookings { get; }
        Task Save();
    }
}
