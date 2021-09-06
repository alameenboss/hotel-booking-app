using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Data.Repository.EFCore;
using HotelBooking.Domain;
using System.Collections.Generic;
using System.Linq;

namespace HotelBooking.Data.Repository.Repository
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
