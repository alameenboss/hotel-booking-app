using HotelBooking.API.Contracts;
using HotelBooking.API.Entities;
using HotelBooking.API.Entities.Models;

namespace HotelBooking.API.Repository
{
    public class EmployeeRepository : RepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(RepositoryContext repositoryContext)
            :base(repositoryContext)
        {
        }
    }
}
