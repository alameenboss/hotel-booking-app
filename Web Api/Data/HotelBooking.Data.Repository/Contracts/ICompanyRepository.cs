using HotelBooking.Domain;
using System.Collections.Generic;

namespace HotelBooking.Data.Repository.Contracts
{
    public interface ICompanyRepository : IRepositoryBase<Company>
    {
        IEnumerable<Company> GetAllCompanies(bool trackChanges);
    }
}
