using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Data.Repository.EFCore;
using HotelBooking.Domain;

namespace HotelBooking.Data.Repository.Repository
{
    public class EmployeeRepository : RepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(ApplicationDbContext repositoryContext)
            : base(repositoryContext)
        {
        }
    }
}