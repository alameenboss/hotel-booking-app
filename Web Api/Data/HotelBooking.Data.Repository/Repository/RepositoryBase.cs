using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Data.Repository.EFCore;
using HotelBooking.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HotelBooking.Data.Repository.Repository
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : BaseEntity
    {
        protected RepositoryContext RepositoryContext;
        private readonly DbSet<T> entites;
        public RepositoryBase(RepositoryContext repositoryContext)
        {
            RepositoryContext = repositoryContext;
            entites = RepositoryContext.Set<T>();
        }

        public IQueryable<T> FindAll(bool trackChanges) =>
            !trackChanges ? entites.AsNoTracking() : entites;

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression,
        bool trackChanges) => !trackChanges ?
              entites.Where(expression).AsNoTracking() :
              entites.Where(expression);

        public async Task<IEnumerable<T>> GetAll() =>
            await entites.ToListAsync();

        public async Task<T> GetById(int Id) =>
            await entites.Where(x => x.Id == Id).FirstOrDefaultAsync();

        public void Create(T entity) => entites.Add(entity);

        public void Update(T entity) => entites.Update(entity);

        public void Delete(T entity) => entites.Remove(entity);
    }
}
