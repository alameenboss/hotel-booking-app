using HotelBooking.API.Contracts;
using HotelBooking.API.Entities;
using HotelBooking.API.Entities.Models;
using System.Collections.Generic;
using System.Linq;

namespace HotelBooking.API.Repository
{
    public class CompanyRepository : RepositoryBase<Company>, ICompanyRepository
    {
        public CompanyRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<Company> GetAllCompanies(bool trackChanges) =>
           FindAll(trackChanges)
           .OrderBy(c => c.Name)
           .ToList();
    }
}
