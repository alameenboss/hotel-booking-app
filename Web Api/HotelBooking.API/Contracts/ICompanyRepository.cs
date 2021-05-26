using HotelBooking.API.Entities.Models;
using System.Collections.Generic;

namespace HotelBooking.API.Contracts
{
    public interface ICompanyRepository
    {
        IEnumerable<Company> GetAllCompanies(bool trackChanges);
    }
}
