using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Service.Contracts;

namespace HotelBooking.Service.Implementation
{
    public class CompanyService : ICompanyService
    {
        private readonly IRepositoryManager _repository;

        public CompanyService(IRepositoryManager repository)
        {
            _repository = repository;
        }
    }
}