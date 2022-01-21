using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HotelBooking.Data.Repository.Contracts
{
    public interface IRepositoryBase<T>
    {
        IQueryable<T> FindAll(bool trackChanges);

        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression, bool trackChanges);

        Task<IEnumerable<T>> GetAll();

        Task<T> GetById(int Id);

        void Create(T entity);

        void Update(T entity);

        void Delete(T entity);
    }
}