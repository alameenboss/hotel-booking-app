using System.Threading.Tasks;

namespace HotelBooking.Data.Repository.Contracts
{
    public interface IRepositoryManager
    {
        IRoomRepository Room { get; }
        IBookingRepository Bookings { get; }
        Task Save();
    }
}